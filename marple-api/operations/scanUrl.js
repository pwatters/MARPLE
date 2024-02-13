const axios = require("axios");
const AnalysisMetadata = require("../models/AnalysisMetadata");
const AnalysisStatistics = require("../models/AnalysisStatistics");
const EngineResults = require("../models/EngineResults");

const scanUrl = async (url) => {
  try {
    const scanId = (
      await axios.post(
        "https://www.virustotal.com/api/v3/urls",
        { url: url },
        {
          headers: {
            "x-apikey": process.env.VIRUSTOTAL_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      )
    )?.data?.data?.id;

    const scanResult = (
      await axios.get(
        `${"https://www.virustotal.com/api/v3/analyses/"}${scanId}`,
        {
          headers: {
            "x-apikey": process.env.VIRUSTOTAL_API_KEY,
          },
        }
      )
    )?.data.data;

    if (isFailedScan(scanResult)) {
      console.log("Scan is queued");
      throw new Error("Scan is queued");
    }

    const exists = await checkAnalysisIdExists(scanResult.id);

    if (!exists) {
      // Insert analysis metadata along with the URL
      await AnalysisMetadata.create({
        AnalysisId: scanResult.id,
        Date: scanResult.attributes.date,
        Status: scanResult.attributes.status,
        Url: url,
      });

      // Insert analysis statistics
      const stats = scanResult.attributes.stats;
      await AnalysisStatistics.create({
        AnalysisId: scanResult.id,
        Malicious: stats.malicious,
        Suspicious: stats.suspicious,
        Undetected: stats.undetected,
        Harmless: stats.harmless,
        Timeout: stats.timeout,
      });

      // Insert engine results
      for (const [engineName, engineResult] of Object.entries(
        scanResult.attributes.results
      )) {
        await EngineResults.create({
          AnalysisId: scanResult.id,
          EngineName: engineName,
          Method: engineResult.method,
          Category: engineResult.category,
          Result: engineResult.result,
        });
      }
    }

    return { success: true, url, scanResult };
  } catch (err) {
    return { success: false, url };
  }
};

const isFailedScan = (scanResult) =>
  !Object.values(scanResult.attributes.stats).some((value) => value > 0);

const checkAnalysisIdExists = async (analysisId) => {
  const analysis = await AnalysisMetadata.findByPk(analysisId);
  return analysis != null;
};

module.exports = scanUrl;
