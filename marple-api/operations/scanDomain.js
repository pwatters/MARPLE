const axios = require("axios");

const scanDomain = async (domain) => {
  try {
    const domainReport = (
      await axios.get(
        `${"https://www.virustotal.com/api/v3/domains/"}${domain}`,
        {
          headers: {
            "x-apikey": process.env.VIRUSTOTAL_API_KEY,
          },
        }
      )
    )?.data.data;

    return { success: true, domain, domainReport };
  } catch (error) {
    return { success: false, domain };
  }
};

module.exports = scanDomain;
