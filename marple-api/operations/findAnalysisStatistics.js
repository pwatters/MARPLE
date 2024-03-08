const AnalysisStatistics = require("../models/AnalysisStatistics");

const findAnalysisStatistics = async (analysisId) =>
  AnalysisStatistics.findOne({ analysisId });

module.exports = findAnalysisStatistics;
