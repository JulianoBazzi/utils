import { getRandomInt } from '../number/getRandomInt.js';
import { digitAt } from '../validation/internal/digits.js';
import { voterIdDigit } from '../validation/internal/voterIdDigit.js';
import { randomDigits } from './internal/randomDigits.js';

/**
 * Generate a random, valid voter registration number (título de eleitor) —
 * random state code between 01 and 28, including the SP/MG exception rule.
 * Handy for tests and seeds.
 *
 * @example
 * generateVoterId() // e.g. "123456780396"
 */
export function generateVoterId(): string {
  const base = randomDigits(8);
  const stateCode = getRandomInt(1, 28);
  const state = String(stateCode).padStart(2, '0');

  // São Paulo (01) and Minas Gerais (02) use the exception rule.
  const isSpOrMg = stateCode === 1 || stateCode === 2;

  let sum1 = 0;
  for (let i = 0; i < 8; i += 1) {
    sum1 += digitAt(base, i) * (i + 2);
  }
  const dv1 = voterIdDigit(sum1, isSpOrMg);

  const sum2 = digitAt(state, 0) * 7 + digitAt(state, 1) * 8 + dv1 * 9;
  const dv2 = voterIdDigit(sum2, isSpOrMg);

  return `${base}${state}${dv1}${dv2}`;
}
