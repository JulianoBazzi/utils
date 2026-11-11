import { formatPostalCode } from '../formatting/formatPostalCode.js';
import { randomDigits } from './internal/randomDigits.js';

interface GeneratePostalCodeOptions {
  /** Return the CEP masked as `00000-000`. Defaults to `false`. */
  formatted?: boolean;
}

/**
 * Generate a random 8-digit Brazilian postal code (CEP) — handy for tests
 * and seeds. CEP has no check digit, so any 8-digit value is valid.
 *
 * @example
 * generatePostalCode() // e.g. "01310100"
 * generatePostalCode({ formatted: true }) // e.g. "01310-100"
 */
export function generatePostalCode(options: GeneratePostalCodeOptions = {}): string {
  const { formatted = false } = options;

  const postalCode = randomDigits(8);

  return formatted ? formatPostalCode(postalCode) : postalCode;
}
