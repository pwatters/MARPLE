const axios = require("axios");
const cheerio = require("cheerio");
const scanUrl = require("./scanUrl");
const scanDomain = require("./scanDomain");

const scanSite = async (url) => {
  // Scrape the URL for APK links
  const html = await axios.get(url).then((response) => response.data);
  const $ = cheerio.load(html);
  const apkLinks = $("a")
    .map((_, link) => $(link).attr("href"))
    .get()
    .filter((href) => href && href.includes(".apk"));

  // Send the APK file URLs to VirusTotal for scanning
  const urlScanPromises = apkLinks.map(scanUrl);
  const urlScanResults = await Promise.all(urlScanPromises);
  const successfulUrlScanResults = urlScanResults.filter(
    (result) => result.success
  );
  const urlReports = successfulUrlScanResults.map(
    (result) => result.scanResult
  );
  const failedUrlScanResults = urlScanResults
    .filter((result) => !result.success)
    .map((result) => result.url);
  const maliciousUrls = successfulUrlScanResults
    .filter(
      (scanResponse) => scanResponse.scanResult.attributes?.stats?.malicious > 0
    )
    .map((scanResponse) => scanResponse.url);

  const maliciousDomains = Array.from(
    new Set(maliciousUrls.map((url) => new URL(url).hostname))
  );

  // Send the malicious domains to VirusTotal for scanning
  const domainScanPromises = maliciousDomains.map(scanDomain);
  const domainScanResults = await Promise.all(domainScanPromises);
  const successfulDomainScanResults = domainScanResults.filter(
    (result) => result.success
  );
  const domainReports = successfulDomainScanResults.map(
    (result) => result.domainReport
  );
  const failedDomainScanResults = domainScanResults
    .filter((scan) => !scan.success)
    .map((scan) => scan.domain);

  return {
    totalUrlScans: urlScanResults.length,
    successfulUrlScans: successfulUrlScanResults.length,
    failedUrlScans: failedUrlScanResults.length,
    totalDomainScans: domainScanResults.length,
    successfulDomainScans: successfulDomainScanResults.length,
    failedDomainScans: failedDomainScanResults.length,
    urlReports,
    failedUrlScanResults,
    domainReports,
    failedDomainScanResults,
  };
};

module.exports = scanSite;
