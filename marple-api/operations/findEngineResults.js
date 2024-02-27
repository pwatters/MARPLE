const EngineResults = require("../models/EngineResults");

const findEngineResults = async (analysisId) =>
  await EngineResults.find({ analysisId });

module.exports = findEngineResults;
