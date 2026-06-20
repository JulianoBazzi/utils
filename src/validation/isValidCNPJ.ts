import { onlyAlphanumeric } from '../formatting/onlyAlphanumeric.js';
import { checkDigit } from './internal/checkDigit.js';

/**
 * Validate a Brazilian CNPJ via its two check digits. Supports both the legacy
 * numeric format and the new (2026) alphanumeric format — 12 alphanumeric
 * characters followed by 2 numeric check digits.
 *
 * @example
 * isValidCNPJ("11.222.333/0001-81") // true
 * isValidCNPJ("12ABC34501DE35") // true (alphanumeric)
 */
export function isValidCNPJ(value?: string | null): boolean {
  const cnpj = onlyAlphanumeric(value);

  if (cnpj.length !== 14 || !/\d{2}$/.test(cnpj) || /^(.)\1{13}$/.test(cnpj)) {
    return false;
  }

  const dv1 = checkDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = checkDigit(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return dv1 === Number(cnpj[12]) && dv2 === Number(cnpj[13]);
}
