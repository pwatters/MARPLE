const mongoose = require("mongoose");

const analysisStatisticsSchema = new mongoose.Schema(
  {
    analysisId: {
      type: String,
      required: true,
    },
    malicious: {
      type: Number,
      required: true,
      default: 0,
    },
    suspicious: {
      type: Number,
      required: true,
      default: 0,
    },
    undetected: {
      type: Number,
      required: true,
      default: 0,
    },
    harmless: {
      type: Number,
      required: true,
      default: 0,
    },
    timeout: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const AnalysisStatistics = mongoose.model(
  "AnalysisStatistics",
  analysisStatisticsSchema
);

module.exports = AnalysisStatistics;
