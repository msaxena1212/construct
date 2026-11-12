'use strict';
/**
 * Microsoft Project interchange in the MSPDI XML format (Project > Tasks > Task).
 *
 * Mapping (owner decision, 2026-11-02: MSPDI XML, no Microsoft Project installation needed):
 *   - a Task with Summary = 1 becomes a WBS node (PROJECT_WBS); its OutlineNumber gives the parent;
 *   - a Task with Summary = 0 becomes a project task (PROJECT_TASK): Name -> title, Finish -> due_date,
 *     PercentComplete -> progress, status from the percentage;
 *   - UID 0 (the project's own summary task) is not imported.
 *
 * Not carried over, because the database has no field for them: start dates, durations, predecessor links, resources
 * and calendars. Project tasks have no WBS link in the database, so they are exported at the top level.
 */
const { parseXml, childrenNamed, childText, escapeXml, XmlError } = require('../../../core/utils/xml-lite');

const MAX_TASKS = 5000;
const MSPDI_NAMESPACE = 'http://schemas.microsoft.com/project';

class MspError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MspError';
  }
}

/** Reads an MSPDI document into plain task records. Throws MspError for anything that is not a usable MSPDI file. */
function parseMspdi(xmlText) {
  let doc;
  try {
    doc = parseXml(xmlText);
  } catch (err) {
    if (err instanceof XmlError) throw new MspError(`The file is not valid XML: ${err.message}`);
    throw err;
  }
  const project = childrenNamed(doc, 'Project')[0];
  if (!project) throw new MspError('The file is not an MS Project XML document (no Project element).');

  const tasksElement = childrenNamed(project, 'Tasks')[0];
  const taskNodes = tasksElement ? childrenNamed(tasksElement, 'Task') : [];
  if (taskNodes.length > MAX_TASKS) throw new MspError(`A file may hold at most ${MAX_TASKS} tasks.`);

  const tasks = [];
  const skipped = [];
  for (const node of taskNodes) {
    const uid = Number(childText(node, 'UID'));
    if (!Number.isInteger(uid) || uid <= 0) continue; // UID 0 is the project summary task
    const name = childText(node, 'Name') || '';
    if (!name) {
      skipped.push({ uid, reason: 'The task has no name.' });
      continue;
    }
    const finish = childText(node, 'Finish');
    tasks.push({
      uid,
      name,
      outline: childText(node, 'OutlineNumber') || '',
      level: Math.min(50, Math.max(1, Number(childText(node, 'OutlineLevel')) || 1)),
      wbs: childText(node, 'WBS') || '',
      summary: childText(node, 'Summary') === '1',
      percent: Math.min(100, Math.max(0, Number(childText(node, 'PercentComplete')) || 0)),
      due: finish && /^\d{4}-\d{2}-\d{2}/.test(finish) ? finish.slice(0, 10) : null,
    });
  }

  return { projectName: childText(project, 'Name') || null, tasks, skipped };
}

/** Status of a project task from its percentage complete. The database uses the labels below. */
function statusForPercent(percent) {
  if (percent >= 100) return 'Completed';
  if (percent > 0) return 'In Progress';
  return 'To Do';
}

/** OutlineNumber for each WBS node (parent_id links), numbered in order: 1, 1.1, 1.2, 2 ... */
function outlinesFor(wbsNodes) {
  const ids = new Set(wbsNodes.map((n) => n.id));
  const byParent = new Map();
  for (const node of wbsNodes) {
    const key = node.parent_id != null && ids.has(node.parent_id) ? node.parent_id : 'root';
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(node);
  }
  for (const list of byParent.values()) list.sort((a, b) => a.id - b.id);

  const result = new Map();
  const walk = (key, prefix, depth) => {
    (byParent.get(key) || []).forEach((node, index) => {
      const outline = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      result.set(node.id, { outline, depth });
      walk(node.id, outline, depth + 1);
    });
  };
  walk('root', '', 1);
  return { outlines: result, ordered: [...result.keys()].map((id) => wbsNodes.find((n) => n.id === id)) };
}

/** MSPDI date-time for a day (a due date is written as the end of its working day). */
function finishFor(dateValue) {
  const day = new Date(dateValue);
  if (Number.isNaN(day.getTime())) return null;
  return `${day.toISOString().slice(0, 10)}T17:00:00`;
}

/**
 * Builds an MSPDI document. wbsNodes: [{id, parent_id, wbs_code, name, level}]; tasks: [{title, progress, due_date}].
 */
function buildMspdi({ projectName, wbsNodes, tasks }) {
  const { outlines, ordered } = outlinesFor(wbsNodes);
  const records = [];
  let uid = 0;

  for (const node of ordered) {
    const position = outlines.get(node.id);
    uid += 1;
    records.push({
      uid,
      name: node.name,
      wbs: node.wbs_code,
      outline: position.outline,
      level: position.depth,
      summary: true,
      percent: 0,
      finish: null,
    });
  }

  const rootCount = [...outlines.values()].filter((p) => p.depth === 1).length;
  tasks.forEach((task, index) => {
    uid += 1;
    records.push({
      uid,
      name: task.title,
      wbs: '',
      outline: String(rootCount + index + 1),
      level: 1,
      summary: false,
      percent: Math.min(100, Math.max(0, Number(task.progress) || 0)),
      finish: task.due_date ? finishFor(task.due_date) : null,
    });
  });

  const body = records
    .map((r) => {
      const lines = [
        '    <Task>',
        `      <UID>${r.uid}</UID>`,
        `      <ID>${r.uid}</ID>`,
        `      <Name>${escapeXml(r.name)}</Name>`,
        r.wbs ? `      <WBS>${escapeXml(r.wbs)}</WBS>` : null,
        `      <OutlineNumber>${escapeXml(r.outline)}</OutlineNumber>`,
        `      <OutlineLevel>${r.level}</OutlineLevel>`,
        `      <PercentComplete>${r.percent}</PercentComplete>`,
        r.finish ? `      <Finish>${r.finish}</Finish>` : null,
        `      <Summary>${r.summary ? 1 : 0}</Summary>`,
        '    </Task>',
      ];
      return lines.filter((l) => l !== null).join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    `<Project xmlns="${MSPDI_NAMESPACE}">`,
    `  <Name>${escapeXml(projectName || 'Project')}</Name>`,
    '  <Tasks>',
    body,
    '  </Tasks>',
    '</Project>',
    '',
  ].join('\n');
}

module.exports = { parseMspdi, buildMspdi, statusForPercent, MspError, MAX_TASKS };
