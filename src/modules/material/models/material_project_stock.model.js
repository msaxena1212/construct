module.exports = (sequelize, Sequelize) => {
  const Material_Project_Stock = sequelize.define(
    "MATERIAL_PROJECT_STOCK",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      sku: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      category: {
        type: Sequelize.STRING,
      },

      // Canonical UOM for this project stock record. NOT NULL; supported codes only (src/core/utils/uom.js).
      unit_of_measure: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "units",
        validate: {
          isIn: {
            args: [Object.keys(require("../../../core/utils/uom").UOM)],
            msg: "Unsupported or blank unit of measure.",
          },
        },
      },

      stockIn: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      cost: {
        type: Sequelize.STRING,
      },

      vendor_name: {
        type: Sequelize.STRING,
      },

      project_name: {
        type: Sequelize.STRING,
      },


      stockUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      status: {
        type: Sequelize.STRING,
      },

      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      hooks: {
        // The UOM is the canonical unit of every movement. Changing it after movements exist would silently
        // reinterpret recorded quantities, so it is refused. A controlled conversion would be a separate process.
        beforeUpdate: async (instance, options) => {
          if (!instance.changed("unit_of_measure")) return;
          const movements = await sequelize.models.STOCK_LEDGER.count({
            where: { material_id: instance.id },
            transaction: options.transaction,
          });
          if (movements > 0) {
            throw new Error("Unit of measure cannot be changed after stock movements exist.");
          }
        },
      },
    }
  );

  return Material_Project_Stock;
};