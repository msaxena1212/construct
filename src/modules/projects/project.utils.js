const db = require("../../models");

/**
 * Reusable utility to synchronize progress across Task -> Milestone -> Project
 */
const syncProjectProgress = async (projectId, transaction = null) => {
  try {
    console.log(`[ProgressSync] Syncing Project: ${projectId}`);
    const project = await db.project.findByPk(projectId, { transaction });
    if (!project) return;

    const milestones = await db.milestone.findAll({
      where: { project_id: projectId, parent_id: null },
      transaction
    });

    if (milestones.length === 0) {
      console.log(`[ProgressSync] No milestones for project ${projectId}`);
      return;
    }

    let totalMilestoneProgress = 0;
    for (const ms of milestones) {
      totalMilestoneProgress += (ms.progress || 0);
    }

    const projectProgress = Math.round(totalMilestoneProgress / milestones.length);
    console.log(`[ProgressSync] Project ${projectId} progress: ${projectProgress}%`);
    await project.update({ progress: projectProgress }, { transaction });

    return projectProgress;
  } catch (error) {
    console.error("[ProgressSync] Error syncing project progress:", error);
  }
};

const syncMilestoneProgress = async (milestoneId, transaction = null) => {
  try {
    const milestone = await db.milestone.findByPk(milestoneId, { transaction });
    if (!milestone) return 0;

    const subMilestones = await db.milestone.findAll({
      where: { parent_id: milestoneId },
      transaction
    });

    let totalProgressItems = 0;
    let sumProgress = 0;

    // Add sub-milestones to calculation
    if (subMilestones.length > 0) {
      for (const sm of subMilestones) {
        sumProgress += (sm.progress || 0);
        totalProgressItems++;
      }
    }

    // Add direct tasks to calculation
    const tasks = await db.project_task.findAll({
      where: { milestone_id: milestoneId },
      transaction
    });

    if (tasks.length > 0) {
      for (const task of tasks) {
        sumProgress += (task.progress || 0);
        totalProgressItems++;
      }
    }

    let progress = totalProgressItems > 0 ? Math.round(sumProgress / totalProgressItems) : 0;

    console.log(`[ProgressSync] Milestone ${milestoneId} progress: ${progress}%`);
    await milestone.update({ progress }, { transaction });

    if (milestone.parent_id) {
      await syncMilestoneProgress(milestone.parent_id, transaction);
    }

    return progress;
  } catch (error) {
    console.error("[ProgressSync] Error syncing milestone progress:", error);
    return 0;
  }
};

const syncTaskProgress = async (taskId, transaction = null) => {
  try {
    console.log(`[ProgressSync] Syncing Task: ${taskId}`);
    const task = await db.project_task.findByPk(taskId, { transaction });
    if (!task) return;

    const subTasks = await db.project_sub_task.findAll({
      where: { task_id: taskId },
      transaction
    });

    let progress = 0;
    if (subTasks.length > 0) {
      const completedCount = subTasks.filter(st => st.completed).length;
      progress = Math.round((completedCount / subTasks.length) * 100);
    } else {
      progress = (task.status === 'Completed') ? 100 : 0;
    }

    console.log(`[ProgressSync] Task ${taskId} progress: ${progress}%`);
    await task.update({ progress }, { transaction });

    if (task.milestone_id) {
      await syncMilestoneProgress(task.milestone_id, transaction);
    }

    await syncProjectProgress(task.project_id, transaction);

    return progress;
  } catch (error) {
    console.error("[ProgressSync] Error syncing task progress:", error);
  }
};

module.exports = {
  syncTaskProgress,
  syncMilestoneProgress,
  syncProjectProgress
};
