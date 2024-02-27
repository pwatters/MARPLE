const AnalysisMetadata = require("../models/AnalysisMetadata");

const findAnalysisMetadata = async () => await AnalysisMetadata.find();

module.exports = findAnalysisMetadata;
