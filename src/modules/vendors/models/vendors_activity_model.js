module.exports = (sequelize, Sequelize) => {

    const Activity = sequelize.define("ACTIVITY", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        icon: {
            type: Sequelize.ENUM("invoice", "cert", "assign"),
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        time_label: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: "JUST NOW",
        },
    }, {
        freezeTableName: true,
    });


    return Activity;
}