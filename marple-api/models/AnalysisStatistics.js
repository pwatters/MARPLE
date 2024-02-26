const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const AnalysisStatistics = sequelize.define(
  "AnalysisStatistics",
  {
    statisticsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    analysisId: {
      type: DataTypes.STRING,
      references: {
        model: "AnalysisMetadata",
        key: "analysisId",
      },
      allowNull: false,
    },
    malicious: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    suspicious: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    undetected: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    harmless: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    timeout: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AnalysisStatistics;
