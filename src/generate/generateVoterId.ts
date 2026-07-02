import { getRandomInt } from '../number/getRandomInt.js';
import { voterIdDigit } from '../validation/internal/voterIdDigit.js';

/**
 * Generate a random, valid voter registration number (título de eleitor) —
 * random state code between 01 and 28, including the SP/MG exception rule.
 * Handy for tests and seeds.
 *
 * @example
 * generateVoterId() // e.g. "123456780396"
 */
export function generateVoterId(): string {
  const base = Array.from({ length: 8 }, () => getRandomInt(0, 9)).join('');
  const stateCode = getRandomInt(1, 28);
  const state = String(stateCode).padStart(2, '0');

  // São Paulo (01) and Minas Gerais (02) use the exception rule.
  const isSpOrMg = stateCode === 1 || stateCode === 2;

  let sum1 = 0;
  for (let i = 0; i < 8; i += 1) {
    sum1 += (base.charCodeAt(i) - 48) * (i + 2);
  }
  const dv1 = voterIdDigit(sum1, isSpOrMg);

  const sum2 = (state.charCodeAt(0) - 48) * 7 + (state.charCodeAt(1) - 48) * 8 + dv1 * 9;
  const dv2 = voterIdDigit(sum2, isSpOrMg);

  return `${base}${state}${dv1}${dv2}`;
}
