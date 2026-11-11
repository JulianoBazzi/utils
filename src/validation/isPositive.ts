/**
 * Check whether a value is a finite number greater than zero — the guard for
 * counts and amounts that may come back `null`, `NaN` or `0`.
 *
 * @example
 * isPositive(3) // true
 * isPositive(0) // false
 * isPositive(null) // false
 * isPositive(Number.POSITIVE_INFINITY) // false
 */
export function isPositive(value?: number | null): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
