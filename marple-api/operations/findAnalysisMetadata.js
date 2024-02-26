const AnalysisMetadata = require("../models/AnalysisMetadata");

const findAnalysisMetadata = async () => await AnalysisMetadata.findAll();

module.exports = findAnalysisMetadata;
