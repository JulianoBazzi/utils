import { isRepeated } from '../validation/internal/digits.js';
import { renavamCheckDigit } from '../validation/internal/renavamDigit.js';
import { randomDigits } from './internal/randomDigits.js';

export interface GenerateRenavamOptions {
  /** Generate the legacy 9-digit format instead of the current 11-digit one. Defaults to `false`. */
  legacy?: boolean;
}

/**
 * Generate a random, valid RENAVAM code — handy for tests and seeds.
 * Defaults to the current 11-digit format; `legacy: true` generates the old
 * 9-digit format.
 *
 * @example
 * generateRenavam() // e.g. "12345678900"
 * generateRenavam({ legacy: true }) // e.g. "345678907"
 */
export function generateRenavam(options: GenerateRenavamOptions = {}): string {
  const { legacy = false } = options;
  const baseLength = legacy ? 8 : 10;

  let base: string;
  do {
    base = randomDigits(baseLength);
  } while (isRepeated(base));

  // The check digit is always computed over the 10-digit base (zero-padded).
  const dv = renavamCheckDigit(base.padStart(10, '0'));

  return `${base}${dv}`;
}
