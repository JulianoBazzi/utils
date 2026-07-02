import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { voterIdDigit } from './internal/voterIdDigit.js';

/**
 * Validate a Brazilian voter registration number (título de eleitor) via its
 * state code and two check digits, including the SP/MG exception.
 *
 * @example
 * isValidVoterId("1234 5678 0396") // true
 * isValidVoterId("123456780397") // false
 */
export function isValidVoterId(value?: string | null): boolean {
  const digits = onlyNumbers(value);

  if (!digits || digits.length > 12) {
    return false;
  }

  const voterId = digits.padStart(12, '0');
  const stateCode = Number(voterId.slice(8, 10));

  if (stateCode < 1 || stateCode > 28) {
    return false;
  }

  // São Paulo (01) and Minas Gerais (02) use the exception rule.
  const isSpOrMg = stateCode === 1 || stateCode === 2;

  let sum1 = 0;
  for (let i = 0; i < 8; i += 1) {
    sum1 += (voterId.charCodeAt(i) - 48) * (i + 2);
  }
  const dv1 = voterIdDigit(sum1, isSpOrMg);

  const sum2 = (voterId.charCodeAt(8) - 48) * 7 + (voterId.charCodeAt(9) - 48) * 8 + dv1 * 9;
  const dv2 = voterIdDigit(sum2, isSpOrMg);

  return dv1 === Number(voterId[10]) && dv2 === Number(voterId[11]);
}
