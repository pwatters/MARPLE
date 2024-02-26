const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const AnalysisMetadata = sequelize.define(
  "AnalysisMetadata",
  {
    analysisId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AnalysisMetadata;
