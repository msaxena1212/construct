module.exports = (sequelize, Sequelize) => {
  const QUOTATION = sequelize.define(
    "QUOTATION",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      quotation_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      sales_person: {
        type: Sequelize.STRING,
      },

      items: {
        type: Sequelize.JSON, // Array of items store karne ke liye

      },

      total_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      status: {
        type: Sequelize.ENUM(
          "Draft",
          "Sent",
          "Negotiating",
          "Approved",
          "Rejected"
        ),
        defaultValue: "Draft",
      },

      vendor_feedback: {
        type: Sequelize.TEXT,
      },

      last_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      quotation_status: {
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

      quotation_type: {
        type: Sequelize.STRING,
      },

    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return QUOTATION;
};


// export interface QuoteItem {
//   materialSku: string;
//   materialName: string;
//   quantity: number;
//   unitPrice: number;
//   totalPrice: number;
//   vendorId: string | number;
//   vendorName: string;
// }

// export interface Quote {
//   id: string;
//   quoteNumber: string;
//   date: string;
//   salesPerson: string;
//   items: QuoteItem[];
//   totalAmount: number;
//   status: 'Draft' | 'Sent' | 'Negotiating' | 'Approved' | 'Rejected';
//   vendorFeedback?: string;
//   lastUpdated?: string;
// }
