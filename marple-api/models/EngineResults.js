const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const EngineResults = sequelize.define(
  "EngineResults",
  {
    ResultId: {
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
    EngineName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "EngineResults",
  }
);

module.exports = EngineResults;
