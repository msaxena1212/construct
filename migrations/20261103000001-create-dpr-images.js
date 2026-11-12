'use strict';
/**
 * Feature: photographs attached to a daily progress report (DPR).
 * Up to 10 images per report; each JPG, PNG or WEBP and at most 10 MB. Image bytes are stored by the storage service
 * (local disk by default); this table holds only the metadata and the stored location.
 * Additive and reversible: down() drops the table.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DPR_IMAGES', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      company_id: { type: Sequelize.INTEGER, allowNull: false },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'PROJECT', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      dpr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'DAILY_PROGRESS_REPORTS', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      file_name: { type: Sequelize.STRING(255), allowNull: false },
      file_url: { type: Sequelize.STRING(500), allowNull: false },
      file_key: { type: Sequelize.STRING(500), allowNull: false },
      mime_type: { type: Sequelize.STRING(50), allowNull: false },
      size_bytes: { type: Sequelize.INTEGER, allowNull: false },
      uploaded_by: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('DPR_IMAGES', ['dpr_id'], { name: 'idx_dpr_images_dpr_id' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DPR_IMAGES');
  },
};
