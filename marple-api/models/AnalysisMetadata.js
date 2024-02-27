const mongoose = require("mongoose");

const analysisMetadataSchema = new mongoose.Schema(
  {
    analysisId: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const AnalysisMetadata = mongoose.model(
  "AnalysisMetadata",
  analysisMetadataSchema
);

module.exports = AnalysisMetadata;
