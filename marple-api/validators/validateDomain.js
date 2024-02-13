const { errorMessages } = require("../constants/errorMessages");

const validateDomain = (domain) => {
  if (!domain) {
    return { isValid: false, message: errorMessages.emptyDomainError };
  }

  const regex =
    /^(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])$/i;

  if (!regex.test(domain)) {
    return { isValid: false, message: errorMessages.invalidDomainError };
  }

  return { isValid: true };
};

module.exports = validateDomain;
