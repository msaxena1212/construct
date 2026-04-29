module.exports = (sequelize, Sequelize) => {
    const ProjectTaskDependency = sequelize.define("PROJECT_TASK_DEPENDENCY", {
        task_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        predecessor_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM('FS', 'SS', 'FF', 'SF'),
            defaultValue: 'FS'
        },
        lag: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return ProjectTaskDependency;
};
