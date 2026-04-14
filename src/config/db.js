const { Sequelize, DataTypes, Model } = require("sequelize");
const config = {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// Initialize Sequelize and connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: config.dialect,
    port: process.env.DB_PORT || 3306,
    operatorsAliases: false,
    pool: config.pool,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB, DataTypes, Model, Sequelize };
