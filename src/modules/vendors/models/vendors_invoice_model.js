module.exports = (sequelize, Sequelize) => {
  const VendorInvoice = sequelize.define("VENDORS_INVOICE", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    invoice_number: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    invoice_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    items: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue('items');
        try { return raw ? JSON.parse(raw) : []; } catch { return []; }
      },
      set(value) {
        this.setDataValue('items', JSON.stringify(value || []));
      },
    },
    subtotal: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    tax_rate: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0,
    },
    tax_amount: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    grand_total: {
      type: Sequelize.DECIMAL(15, 2),
      defaultValue: 0,
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Paid', 'Cancelled', 'Partially Paid'),
      defaultValue: 'Pending',
    },
    settlement_type: {
      type: Sequelize.ENUM('work_poc', 'milestone', 'lumpsum'),
      allowNull: true,
    },
    settlement_completion: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Percentage completion at time of payment',
    },
    milestone_ids: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'JSON array of selected milestone IDs',
      get() {
        const raw = this.getDataValue('milestone_ids');
        try { return raw ? JSON.parse(raw) : []; } catch { return []; }
      },
      set(value) {
        this.setDataValue('milestone_ids', value ? JSON.stringify(value) : null);
      },
    },
    sub_milestone_ids: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'JSON array of selected sub-milestone IDs',
      get() {
        const raw = this.getDataValue('sub_milestone_ids');
        try { return raw ? JSON.parse(raw) : []; } catch { return []; }
      },
      set(value) {
        this.setDataValue('sub_milestone_ids', value ? JSON.stringify(value) : null);
      },
    },
    task_ids: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'JSON array of selected task IDs',
      get() {
        const raw = this.getDataValue('task_ids');
        try { return raw ? JSON.parse(raw) : []; } catch { return []; }
      },
      set(value) {
        this.setDataValue('task_ids', value ? JSON.stringify(value) : null);
      },
    },
    payment_mode: {
      type: Sequelize.ENUM('Bank Transfer', 'UPI', 'Cheque', 'Cash'),
      allowNull: true,
    },
    payment_reference: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    cheque_clearance_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    paid_amount: {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: true,
    },
    paid_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });

  return VendorInvoice;
};