import { getRandomInt } from '../number/getRandomInt.js';
import { cnhCheckDigits } from '../validation/internal/cnhDigits.js';

/**
 * Generate a random, valid CNH (driver's license) number — handy for tests
 * and seeds.
 *
 * @example
 * generateCNH() // e.g. "12345678900"
 */
export function generateCNH(): string {
  let base: string;
  let digits: { dv1: number; dv2: number };

  // Bases where the discount rule pushes dv2 to 10 have no valid check-digit
  // pair, so they are re-drawn.
  do {
    base = Array.from({ length: 9 }, () => getRandomInt(0, 9)).join('');
    digits = cnhCheckDigits(base);
  } while (/^(\d)\1{8}$/.test(base) || digits.dv2 > 9);

  return `${base}${digits.dv1}${digits.dv2}`;
}
