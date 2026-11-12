'use strict';
/**
 * Microsoft Project (MSPDI XML) import and export for one project.
 *   POST /api/v1/projects/msp/:projectId/import   multipart field "file" (XML, 5 MB maximum)
 *   GET  /api/v1/projects/msp/:projectId/export   downloads an MSPDI XML file
 * Mapping and limits are described in services/mspdi.service.js.
 *
 * Import rules: a WBS code that already exists in the project is reused, not duplicated, so importing the same file
 * again does not add WBS nodes twice.
 * Imported tasks sit under one milestone, "MS Project: <project name>", so they appear in the Tasks tab. A re-import of
 * the same schedule replaces the earlier import: the milestone is reused, tasks are matched by their MSPDI UID
 * (PROJECT_TASK.msp_uid) and updated, new tasks are created, and earlier tasks the file no longer contains are removed.
 * An earlier task that someone has worked on (comment, attachment, activity, assignee, sub-task or dependency) is kept
 * and counted as tasks_kept, never deleted. Tasks created by hand are never matched or removed.
 */
const multer = require('multer');
const db = require('../../../models');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');
const { parseMspdi, buildMspdi, statusForPercent, MspError } = require('../services/mspdi.service');
const { syncMilestoneProgress, syncProjectProgress } = require('../project.utils');

const MAX_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
}).single('file');

function uploadMiddleware(req, res, next) {
  upload(req, res, (err) => {
    if (!err) return next();
    const tooBig = err.code === 'LIMIT_FILE_SIZE';
    return res.status(tooBig ? 413 : 400).json({
      status: 'failed',
      message: tooBig ? 'The file must be 5 MB or smaller.' : 'Upload one XML file in the "file" field.',
    });
  });
}

exports.uploadMiddleware = uploadMiddleware;

function importMilestoneName(projectName) {
  const label = String(projectName || '').trim() || 'imported schedule';
  return `MS Project: ${label}`.slice(0, 255);
}

/** True when someone has added work to a task, so an import must not delete it. */
async function hasUserWork(taskId, transaction) {
  const where = { task_id: taskId };
  if ((await db.task_comment.count({ where, transaction })) > 0) return true;
  if ((await db.task_attachment.count({ where, transaction })) > 0) return true;
  if ((await db.task_activity.count({ where, transaction })) > 0) return true;
  if ((await db.project_task_assignee.count({ where, transaction })) > 0) return true;
  if ((await db.project_sub_task.count({ where, transaction })) > 0) return true;
  if ((await db.project_task_dependency.count({ where, transaction })) > 0) return true;
  return (await db.project_task_dependency.count({ where: { predecessor_id: taskId }, transaction })) > 0;
}

exports.importProject = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    const projectId = Number(req.params.projectId);
    await assertProjectAccess(req, projectId);
    if (!req.file) return res.status(400).json({ status: 'failed', message: 'Attach an MS Project XML file.' });

    let parsed;
    try {
      parsed = parseMspdi(req.file.buffer.toString('utf8'));
    } catch (err) {
      if (err instanceof MspError) return res.status(400).json({ status: 'failed', message: err.message });
      throw err;
    }

    const summaries = parsed.tasks.filter((t) => t.summary);
    const details = parsed.tasks.filter((t) => !t.summary);
    if (summaries.length === 0 && details.length === 0) {
      return res.status(400).json({ status: 'failed', message: 'The file has no tasks to import.' });
    }

    const counts = await db.sequelize.transaction(async (t) => {
      const outlineToWbs = new Map();
      const result = {
        wbs_created: 0,
        wbs_reused: 0,
        tasks_created: 0,
        tasks_updated: 0,
        tasks_removed: 0,
        tasks_kept: 0,
        milestone_id: null,
        milestone_name: null,
      };

      for (const task of summaries) {
        const code = (task.wbs || task.outline || `MSP-${task.uid}`).slice(0, 50);
        const parentOutline = task.outline.includes('.') ? task.outline.slice(0, task.outline.lastIndexOf('.')) : null;
        const parent_id = parentOutline && outlineToWbs.has(parentOutline) ? outlineToWbs.get(parentOutline) : null;

        let node = await db.wbs.findOne({ where: { company_id, project_id: projectId, wbs_code: code }, transaction: t });
        if (node) {
          result.wbs_reused += 1;
        } else {
          node = await db.wbs.create(
            {
              company_id,
              project_id: projectId,
              parent_id,
              wbs_code: code,
              name: task.name.slice(0, 255),
              level: task.level,
              status: 'active',
            },
            { transaction: t }
          );
          result.wbs_created += 1;
        }
        if (task.outline) outlineToWbs.set(task.outline, node.id);
      }

      // One milestone per schedule name holds the imported tasks. A re-import of the same schedule reuses it, so the
      // earlier import is replaced rather than duplicated.
      const milestoneName = importMilestoneName(parsed.projectName);
      let importMilestone = null;
      if (details.length > 0) {
        importMilestone = await db.milestone.findOne({
          where: { project_id: projectId, name: milestoneName },
          order: [['id', 'ASC']],
          transaction: t,
        });
        if (!importMilestone) {
          importMilestone = await db.milestone.create(
            { project_id: projectId, name: milestoneName, status: 'Not Started', progress: 0 },
            { transaction: t }
          );
        }
        result.milestone_id = importMilestone.id;
        result.milestone_name = importMilestone.name;
      }

      // Tasks from the earlier import, matched by their MSPDI UID. Tasks created by hand have no UID and are left alone.
      const earlier = importMilestone
        ? await db.project_task.findAll({
            where: { project_id: projectId, milestone_id: importMilestone.id },
            order: [['id', 'ASC']],
            transaction: t,
          })
        : [];
      const earlierByUid = new Map();
      for (const task of earlier) {
        if (task.msp_uid != null) earlierByUid.set(task.msp_uid, task);
      }

      const fileUids = new Set();
      for (const task of details) {
        fileUids.add(task.uid);
        const values = {
          title: task.name.slice(0, 255),
          status: statusForPercent(task.percent),
          progress: Math.round(task.percent),
          due_date: task.due ? new Date(`${task.due}T00:00:00Z`) : null,
        };
        const match = earlierByUid.get(task.uid);
        if (match) {
          await match.update(values, { transaction: t });
          result.tasks_updated += 1;
        } else {
          await db.project_task.create(
            { ...values, project_id: projectId, milestone_id: importMilestone.id, msp_uid: task.uid, created_by: req.user.id },
            { transaction: t }
          );
          result.tasks_created += 1;
        }
      }

      // Earlier tasks the file no longer contains are removed, unless someone has worked on them. Those are kept.
      for (const task of earlier) {
        if (task.msp_uid == null || fileUids.has(task.msp_uid)) continue;
        if (await hasUserWork(task.id, t)) {
          result.tasks_kept += 1;
          continue;
        }
        await task.destroy({ transaction: t });
        result.tasks_removed += 1;
      }

      if (importMilestone) {
        await syncMilestoneProgress(importMilestone.id, t);
        await syncProjectProgress(projectId, t);
      }
      return result;
    });

    return res.status(201).json({
      status: 'success',
      message: 'MS Project file imported.',
      data: { ...counts, skipped: parsed.skipped, source_project_name: parsed.projectName },
    });
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('[msp import]', err.message);
    return res.status(500).json({ status: 'failed', message: 'The MS Project file could not be imported.' });
  }
};

exports.exportProject = async (req, res) => {
  try {
    const company_id = req.user.company_id;
    const projectId = Number(req.params.projectId);
    await assertProjectAccess(req, projectId);

    const project = await db.project.findOne({ where: { id: projectId, company_id } });
    if (!project) return res.status(404).json({ status: 'failed', message: 'Project not found.' });

    const wbsNodes = await db.wbs.findAll({ where: { company_id, project_id: projectId }, order: [['id', 'ASC']] });
    const tasks = await db.project_task.findAll({ where: { project_id: projectId }, order: [['id', 'ASC']] });

    const xml = buildMspdi({
      projectName: project.name,
      wbsNodes: wbsNodes.map((n) => ({ id: n.id, parent_id: n.parent_id, wbs_code: n.wbs_code, name: n.name, level: n.level })),
      tasks: tasks.map((t) => ({ title: t.title, progress: t.progress, due_date: t.due_date })),
    });

    const safeName = String(project.name || 'project').replace(/[^A-Za-z0-9_-]+/g, '_').slice(0, 80) || 'project';
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}-msp.xml"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(xml);
  } catch (err) {
    if (handleAccessError(err, res)) return undefined;
    console.error('[msp export]', err.message);
    return res.status(500).json({ status: 'failed', message: 'The MS Project file could not be exported.' });
  }
};
