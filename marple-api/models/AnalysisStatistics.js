const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const AnalysisStatistics = sequelize.define(
  "AnalysisStatistics",
  {
    StatisticsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    AnalysisId: {
      type: DataTypes.STRING,
      references: {
        model: "AnalysisMetadata",
        key: "AnalysisId",
      },
      allowNull: false,
    },
    Malicious: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Suspicious: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Undetected: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Harmless: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    Timeout: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "AnalysisStatistics",
  }
);

module.exports = AnalysisStatistics;
