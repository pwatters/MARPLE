const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const AnalysisMetadata = sequelize.define(
  "AnalysisMetadata",
  {
    AnalysisId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "AnalysisMetadata",
  }
);

module.exports = AnalysisMetadata;
