module.exports = (sequelize, Sequelize) => {
  const ProjectTask = sequelize.define("PROJECT_TASK", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: Sequelize.INTEGER,
      allowNull: true, // For subtasks
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    priority: {
      type: Sequelize.ENUM("High Priority", "Medium Priority", "Low Priority", "Archived"),
      defaultValue: "Medium Priority",
    },
    status: {
      type: Sequelize.ENUM("To Do", "In Progress", "Review", "Completed"),
      defaultValue: "To Do",
    },
    progress: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    due_date: {
      type: Sequelize.DATE,
    },
    is_completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }, {
    freezeTableName: true,
  });

  ProjectTask.associate = (models) => {
    ProjectTask.belongsTo(models.project, {
      foreignKey: "project_id",
      as: "project",
    });
    ProjectTask.belongsTo(models.project_task, {
      foreignKey: "parent_id",
      as: "parent",
    });
    ProjectTask.hasMany(models.project_task, {
      foreignKey: "parent_id",
      as: "subtasks",
    });
    ProjectTask.belongsToMany(models.user, {
      through: "PROJECT_TASK_ASSIGNEE",
      foreignKey: "task_id",
      otherKey: "user_id",
      as: "assignees",
    });
    ProjectTask.hasMany(models.task_attachment, {
      foreignKey: "task_id",
      as: "attachments",
    });
    ProjectTask.hasMany(models.task_comment, {
      foreignKey: "task_id",
      as: "comments",
    });
    ProjectTask.hasMany(models.task_activity, {
      foreignKey: "task_id",
      as: "activities",
    });
  };

  return ProjectTask;
};
