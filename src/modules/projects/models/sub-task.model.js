module.exports = (sequelize, Sequelize) => {
  const ProjectSubTask = sequelize.define("PROJECT_SUB_TASK", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },


      itemName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      stockIn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      materialQty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },


      equipmentQty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      no_of_labor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },


  }, {
    freezeTableName: true,
  });

  ProjectSubTask.associate = (models) => {
    ProjectSubTask.belongsTo(models.project_task, {
      foreignKey: "task_id",
      as: "task",
    });
  };

  return ProjectSubTask;
};
