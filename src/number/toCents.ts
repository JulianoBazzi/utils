import { presentNumber } from './internal/presentNumber.js';
import { roundTo, shift } from './internal/round.js';

/**
 * Convert a decimal amount to integer cents, rounding exactly (`1.005` → `101`,
 * not `100`). Returns `0` for missing or non-finite input.
 *
 * @example
 * toCents(19.9) // 1990
 * toCents(1.005) // 101
 * toCents(null) // 0
 */
export function toCents(value?: number | null): number {
  const number = presentNumber(value);
  // Round in decimal space first, then move the point: 1.005 → 1.01 → 101.
  return number === undefined ? 0 : shift(roundTo(number, 2), 2);
}
