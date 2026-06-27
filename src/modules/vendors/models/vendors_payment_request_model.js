module.exports = (sequelize, Sequelize) => {
    const VendorPaymentRequest = sequelize.define("VENDORS_PAYMENT_REQUEST", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vendor_id: { type: Sequelize.INTEGER, allowNull: false },
        company_id: { type: Sequelize.INTEGER, allowNull: false },
        invoice_id: { type: Sequelize.INTEGER, allowNull: false },
        project_id: { type: Sequelize.INTEGER, allowNull: true },

        amount: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
        mode: {
            type: Sequelize.ENUM('Bank Transfer', 'UPI', 'Cheque', 'Cash'),
            allowNull: false,
        },
        reference: { type: Sequelize.STRING(255), allowNull: true },
        clearance_date: { type: Sequelize.DATEONLY, allowNull: true },

        settlement_type: {
            type: Sequelize.ENUM('work_poc', 'milestone', 'lumpsum'),
            allowNull: true,
        },
        settlement_completion: { type: Sequelize.DECIMAL(5, 2), allowNull: true },
        milestone_ids: {
            type: Sequelize.TEXT, allowNull: true,
            get() {
                const raw = this.getDataValue('milestone_ids');
                try { return raw ? JSON.parse(raw) : []; } catch { return []; }
            },
            set(value) {
                this.setDataValue('milestone_ids', value ? JSON.stringify(value) : null);
            },
        },
        sub_milestone_ids: {
            type: Sequelize.TEXT, allowNull: true,
            get() {
                const raw = this.getDataValue('sub_milestone_ids');
                try { return raw ? JSON.parse(raw) : []; } catch { return []; }
            },
            set(value) {
                this.setDataValue('sub_milestone_ids', value ? JSON.stringify(value) : null);
            },
        },
        task_ids: {
            type: Sequelize.TEXT, allowNull: true,
            get() {
                const raw = this.getDataValue('task_ids');
                try { return raw ? JSON.parse(raw) : []; } catch { return []; }
            },
            set(value) {
                this.setDataValue('task_ids', value ? JSON.stringify(value) : null);
            },
        },

        status: {
            type: Sequelize.ENUM('pending_approval', 'approved', 'rejected'),
            defaultValue: 'pending_approval',
        },
        budget_allocated: { type: Sequelize.DECIMAL(15, 2), allowNull: true },
        budget_invoiced: { type: Sequelize.DECIMAL(15, 2), allowNull: true },
        exceeded_by: { type: Sequelize.DECIMAL(15, 2), allowNull: true },

        approved_by: { type: Sequelize.INTEGER, allowNull: true },
        approved_at: { type: Sequelize.DATE, allowNull: true },
        rejection_reason: { type: Sequelize.TEXT, allowNull: true },
        requested_by: { type: Sequelize.INTEGER, allowNull: true },
    }, {
        freezeTableName: true,
    });

    return VendorPaymentRequest;
};