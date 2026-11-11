import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { cnhCheckDigits } from './internal/cnhDigits.js';
import { isRepeated } from './internal/digits.js';

/**
 * Validate a Brazilian driver's license (CNH) number via its two check digits
 * (Denatran algorithm, including the discount rule for the second digit).
 *
 * @example
 * isValidCNH("12345678900") // true
 * isValidCNH("11111111111") // false
 */
export function isValidCNH(value?: string | null): boolean {
  const cnh = onlyNumbers(value);

  if (cnh.length !== 11 || isRepeated(cnh)) {
    return false;
  }

  const { dv1, dv2 } = cnhCheckDigits(cnh);

  return dv1 === Number(cnh[9]) && dv2 === Number(cnh[10]);
}
