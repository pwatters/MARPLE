require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const scanSite = require("./operations/scanSite");
const scanUrl = require("./operations/scanUrl");
const scanDomain = require("./operations/scanDomain");
const login = require("./operations/login");
const findAnalysisMetadata = require("./operations/findAnalysisMetadata");
const findAnalysisStatistics = require("./operations/findAnalysisStatistics");
const findEngineResults = require("./operations/findEngineResults");
const validateUrl = require("./validators/validateUrl");
const validateDomain = require("./validators/validateDomain");
const { errorMessages } = require("./constants/errorMessages");
const sequelize = require("./dbconfig");
const insertUser = require("./insertUser");

const app = express();
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(async () => {
    console.log("Models synced with the database.");
    const exists = await login({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    if (!exists) {
      await insertUser();
    }
  })
  .catch((err) => {
    console.error("Failed to sync models with the database:", err);
  });

app.use(express.json());
app.use(cors());

// This endpoint requires a VirusTotal premium account
// app.post("/api/scan/site", async (req, res) => {
//   const { url } = req.body;

//   try {
//     const { isValid, message } = validateUrl(url);

//     if (!isValid) {
//       return res.status(400).send(message);
//     }

//     const result = await scanSite(url);
//     return res.json(result);
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res.status(500).send(errorMessages.generalError);
//   }
// });

app.post("/api/scan/url", async (req, res) => {
  const { url } = req.body;

  try {
    const { isValid, message } = validateUrl(url);

    if (!isValid) {
      return res.status(400).send(message);
    }

    const result = await scanUrl(url);

    if (!result.success) {
      return res.status(400).send(errorMessages.scanError);
    }

    return res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.post("/api/scan/domain", async (req, res) => {
  const { domain } = req.body;

  try {
    const { isValid, message } = validateDomain(domain);

    if (!isValid) {
      return res.status(400).send(message);
    }

    const result = await scanDomain(domain);

    if (!result.success) {
      return res.status(400).send(errorMessages.scanError);
    }

    return res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const success = await login(req.body);

    if (!success) {
      return res.status(401).send(errorMessages.loginFailure);
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.get("/api/analysisMetadata", async (req, res) => {
  try {
    const results = await findAnalysisMetadata();
    return res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.get("/api/analysisStatistics/:analysisId", async (req, res) => {
  const { analysisId } = req.params;

  try {
    const results = await findAnalysisStatistics(analysisId);
    return res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.get("/api/engineResults/:analysisId", async (req, res) => {
  const { analysisId } = req.params;

  try {
    const results = await findEngineResults(analysisId);
    return res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send(errorMessages.generalError);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
