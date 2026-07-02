import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { checkDigit } from './internal/checkDigit.js';

/**
 * Validate a Brazilian PIS/PASEP number (with or without mask) via its
 * check digit.
 *
 * @example
 * isValidPIS("120.12345.67-2") // true
 * isValidPIS("11111111111") // false
 */
export function isValidPIS(value?: string | null): boolean {
  const pis = onlyNumbers(value);

  if (pis.length !== 11 || /^(\d)\1{10}$/.test(pis)) {
    return false;
  }

  const dv = checkDigit(pis, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return dv === Number(pis[10]);
}
