import { formatPIS } from '../formatting/formatPIS.js';
import { checkDigit } from '../validation/internal/checkDigit.js';
import { isRepeated } from '../validation/internal/digits.js';
import { randomDigits } from './internal/randomDigits.js';

export interface GeneratePISOptions {
  /** Return the PIS masked as `000.00000.00-0`. Defaults to `false`. */
  formatted?: boolean;
}

/**
 * Generate a random, valid PIS/PASEP number — handy for tests and seeds.
 *
 * @example
 * generatePIS() // e.g. "12012345672"
 * generatePIS({ formatted: true }) // e.g. "120.12345.67-2"
 */
export function generatePIS(options: GeneratePISOptions = {}): string {
  const { formatted = false } = options;

  let base: string;
  do {
    base = randomDigits(10);
  } while (isRepeated(base));

  const pis = `${base}${checkDigit(base, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2])}`;

  return formatted ? formatPIS(pis) : pis;
}
