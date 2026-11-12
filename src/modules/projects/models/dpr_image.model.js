'use strict';

/** Photographs attached to a daily progress report. Table shape must match migration 20261103000001. */
module.exports = (sequelize, Sequelize) => {
  const DprImage = sequelize.define(
    'DPR_IMAGES',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dpr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      file_key: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      mime_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      size_bytes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      indexes: [{ name: 'idx_dpr_images_dpr_id', fields: ['dpr_id'] }],
    }
  );
  return DprImage;
};
