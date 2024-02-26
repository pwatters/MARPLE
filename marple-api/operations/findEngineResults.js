const EngineResults = require("../models/EngineResults");

const findEngineResults = async (analysisId) =>
  await EngineResults.findAll({ where: { analysisId } });

module.exports = findEngineResults;
