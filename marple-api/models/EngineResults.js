const mongoose = require("mongoose");

const engineResultsSchema = new mongoose.Schema(
  {
    analysisId: {
      type: String,
      required: true,
    },
    engineName: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const EngineResults = mongoose.model("EngineResults", engineResultsSchema);

module.exports = EngineResults;
