module.exports = (sequelize, Sequelize) => {
  const DrawingRegister = sequelize.define(
    "DRAWING_REGISTER",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      drawing_number: {
        type: Sequelize.STRING, // e.g. "STR-DWG-004-R2"
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discipline: {
        type: Sequelize.ENUM("Architectural", "Structural", "MEP", "Civil", "Landscape", "Fire_Safety"),
        allowNull: false,
        defaultValue: "Structural",
      },
      revision: {
        type: Sequelize.STRING, // e.g. "R0", "R1", "R2", "IFC" (Issued For Construction)
        defaultValue: "R0",
      },
      status: {
        type: Sequelize.ENUM("draft", "under_review", "approved_for_construction", "superseded", "rejected"),
        defaultValue: "approved_for_construction",
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ai_drawing_summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return DrawingRegister;
};
