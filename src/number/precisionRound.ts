/**
 * Round a number to a fixed number of decimal places.
 * Returns `0` for missing/zero input.
 *
 * @example
 * precisionRound(1.2345) // 1.23
 * precisionRound(1.2345, 1) // 1.2
 */
export function precisionRound(value?: number | null, precision = 2): number {
  if (!value) {
    return 0;
  }

  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
