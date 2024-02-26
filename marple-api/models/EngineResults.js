const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const EngineResults = sequelize.define(
  "EngineResults",
  {
    resultId: {
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
    engineName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = EngineResults;
