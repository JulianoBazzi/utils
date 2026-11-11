import { digitAt } from './digits.js';

// Equivalent to the official rule (reverse the base and weight 2,3,4,...),
// expressed left-to-right over the 10 base digits.
const WEIGHTS = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * RENAVAM check digit from the 10 base digits: `dv = (sum * 10) % 11`,
 * with 10 → 0.
 *
 * @internal
 */
export function renavamCheckDigit(base: string): number {
  let sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += digitAt(base, i) * (WEIGHTS[i] as number);
  }

  const rest = (sum * 10) % 11;
  return rest === 10 ? 0 : rest;
}
