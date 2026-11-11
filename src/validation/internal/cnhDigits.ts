import { digitAt } from './digits.js';

/**
 * Denatran check digits for a CNH, from its 9 base digits — including the
 * discount rule applied to the second digit when the first sum's rest is 10.
 *
 * @internal
 */
export function cnhCheckDigits(base: string): { dv1: number; dv2: number } {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < 9; i += 1) {
    const digit = digitAt(base, i);
    sum1 += digit * (9 - i);
    sum2 += digit * (i + 1);
  }

  let discount = 0;
  let dv1 = sum1 % 11;
  if (dv1 >= 10) {
    dv1 = 0;
    discount = 2;
  }

  const rest = sum2 % 11;
  let dv2 = rest >= 10 ? 0 : rest - discount;
  if (dv2 < 0) {
    dv2 += 11;
  }

  return { dv1, dv2 };
}
