const db = require("../../models");

exports.getProjectsWithProgress = async (company_id) => {
  const projects = await db.project.findAll({
    where: { company_id },
    include: [
      {
        model: db.milestone,
        as: "milestones",
      },
      {
        model: db.project_document,
        as: "documents",
      },
      {
        model: db.user,
        as: "team_members",
        attributes: ["id", "firstname", "lastname", "avatar"],
        through: {
          attributes: ["role"],
        },
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const projectIds = projects.map((project) => project.id);

  const allTasks = await db.project_task.findAll({
    where: {
      project_id: projectIds,
    },
    include: [
      {
        model: db.project_sub_task,
        as: "sub_tasks",
      },
    ],
  });
  const taskMap = {};

  for (const task of allTasks) {
    if (!taskMap[task.submilestone_id]) {
      taskMap[task.submilestone_id] = [];
    }

    taskMap[task.submilestone_id].push(task);
  }

  return projects.map((project) => {
    const projectData = project.toJSON();

    const parentMilestones = [];
    const subMilestoneMap = {};

    for (const milestone of projectData.milestones) {
      if (!milestone.parent_id) {
        parentMilestones.push(milestone);
      } else {
        if (!subMilestoneMap[milestone.parent_id]) {
          subMilestoneMap[milestone.parent_id] = [];
        }

        const tasks = taskMap[milestone.id] || [];

        const tasksWithProgress = tasks.map((task) => {
          const totalSubTasks = task.sub_tasks?.length || 0;
          const completedSubTasks =
            task.sub_tasks?.filter((st) => st.completed).length || 0;

          const task_progress =
            totalSubTasks > 0
              ? Math.round((completedSubTasks / totalSubTasks) * 100)
              : 0;

          return {
            ...task.toJSON(),
            task_progress,
          };
        });

        const submilestone_progress =
          tasksWithProgress.length > 0
            ? Math.round(
                tasksWithProgress.reduce(
                  (sum, task) => sum + task.task_progress,
                  0
                ) / tasksWithProgress.length
              )
            : 0;

        subMilestoneMap[milestone.parent_id].push({
          ...milestone,
          tasks: tasksWithProgress,
          submilestone_progress,
        });
      }
    }

    projectData.milestone_with_sub = parentMilestones.map((parent) => {
      const subMilestones = subMilestoneMap[parent.id] || [];

      const milestone_progress =
        subMilestones.length > 0
          ? Math.round(
              subMilestones.reduce(
                (sum, sm) => sum + sm.submilestone_progress,
                0
              ) / subMilestones.length
            )
          : 0;

      return {
        ...parent,
        subMilestones,
        milestone_progress,
      };
    });

    projectData.project_progress =
      projectData.milestone_with_sub.length > 0
        ? Math.round(
            projectData.milestone_with_sub.reduce(
              (sum, milestone) => sum + milestone.milestone_progress,
              0
            ) / projectData.milestone_with_sub.length
          )
        : 0;

    return projectData;
  });
};