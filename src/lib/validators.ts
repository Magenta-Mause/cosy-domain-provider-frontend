export const SUBDOMAIN_LABEL_PATTERN = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

export const IPV4_PATTERN =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidSubdomainLabel(value: string) {
  return SUBDOMAIN_LABEL_PATTERN.test(value);
}

export function isValidIpv4(value: string) {
  return IPV4_PATTERN.test(value);
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value);
}
