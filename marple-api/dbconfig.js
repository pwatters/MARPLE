const { Sequelize } = require("sequelize");
const tedious = require("tedious");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: "mssql",
    dialectModule: tedious,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: process.env.NODE_ENV === "development",
        instanceName: process.env.DB_SERVER_INSTANCE_NAME,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
