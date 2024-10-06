const DOMAIN_REGEX =
  /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;

const IP_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
const validateDomain = (domain: string): boolean => {
  return (
    DOMAIN_REGEX.test(domain) ||
    IP_REGEX.test(domain) ||
    EMAIL_REGEX.test(domain) ||
    LINKEDIN_REGEX.test(domain)
  );
};

export default validateDomain;
