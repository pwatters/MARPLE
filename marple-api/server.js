require("dotenv").config();
const express = require("express");
// const scanSite = require("./operations/scanSite");
const scanUrl = require("./operations/scanUrl");
const scanDomain = require("./operations/scanDomain");
const validateUrl = require("./validators/validateUrl");
const validateDomain = require("./validators/validateDomain");
const { errorMessages } = require("./constants/errorMessages");
const sequelize = require("./dbconfig");

const app = express();
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the database.");
  })
  .catch((err) => {
    console.error("Failed to sync models with the database:", err);
  });

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
