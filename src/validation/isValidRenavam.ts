import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { isRepeated } from './internal/digits.js';
import { renavamCheckDigit } from './internal/renavamDigit.js';

/**
 * Validate a Brazilian vehicle RENAVAM code via its check digit. Accepts the
 * current 11-digit format and legacy 9–10 digit codes (padded with
 * leading zeros).
 *
 * @example
 * isValidRenavam("12345678900") // true
 * isValidRenavam("345678907") // true (legacy 9 digits)
 * isValidRenavam("12345678901") // false
 */
export function isValidRenavam(value?: string | null): boolean {
  const digits = onlyNumbers(value);

  if (digits.length < 9 || digits.length > 11) {
    return false;
  }

  const renavam = digits.padStart(11, '0');

  if (isRepeated(renavam)) {
    return false;
  }

  return renavamCheckDigit(renavam) === Number(renavam[10]);
}
