import { presentNumber } from './internal/presentNumber.js';
import { roundTo } from './internal/round.js';

/**
 * Round a number to a fixed number of decimal places, without the usual
 * floating-point surprises (`1.005` → `1.01`, not `1`). Rounding is symmetric:
 * halves go away from zero for negatives too (`-1.005` → `-1.01`).
 * Returns `0` for missing or non-finite input.
 *
 * @example
 * precisionRound(1.2345) // 1.23
 * precisionRound(1.2345, 1) // 1.2
 * precisionRound(1.005) // 1.01
 * precisionRound(-1.005) // -1.01
 */
export function precisionRound(value?: number | null, precision = 2): number {
  const number = presentNumber(value);
  return number === undefined ? 0 : roundTo(number, precision);
}
