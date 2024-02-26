const AnalysisStatistics = require("../models/AnalysisStatistics");

const findAnalysisStatistics = async (analysisId) =>
  AnalysisStatistics.findOne({ where: { analysisId } });

module.exports = findAnalysisStatistics;
