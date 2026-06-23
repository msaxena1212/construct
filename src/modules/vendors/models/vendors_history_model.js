module.exports = (sequelize, Sequelize) => {
  const VendorHistory = sequelize.define("VENDORS_HISTORY", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    entity_type: {
      type: Sequelize.ENUM("vendor", "invoice", "labor", "audit"),
      allowNull: false,
    },
    entity_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    action: {
      type: Sequelize.ENUM(
        "created",
        "updated",
        "deleted",
        "status_changed",
        "payment_added"
      ),
      allowNull: false,
    },
    changed_by: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    changed_by_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    old_values: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("old_values");
        try {
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      },
      set(value) {
        this.setDataValue(
          "old_values",
          value ? JSON.stringify(value) : null
        );
      },
    },
    new_values: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("new_values");
        try {
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      },
      set(value) {
        this.setDataValue(
          "new_values",
          value ? JSON.stringify(value) : null
        );
      },
    },
    meta: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("meta");
        try {
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      },
      set(value) {
        this.setDataValue(
          "meta",
          value ? JSON.stringify(value) : null
        );
      },
    },
  }, {
    freezeTableName: true,
    updatedAt: false,
  });

  return VendorHistory;
};