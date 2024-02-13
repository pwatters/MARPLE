const { errorMessages } = require("../constants/errorMessages");

const validateUrl = (url) => {
  if (!url) {
    return { isValid: false, message: errorMessages.emptyUrlError };
  }

  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );

  if (!pattern.test(url)) {
    return { isValid: false, message: errorMessages.invalidUrlError };
  }

  return { isValid: true };
};

module.exports = validateUrl;
