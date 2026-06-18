/**
 * Divide `value1` by `value2`, returning 0 when the divisor is missing,
 * zero or negative (avoids division-by-zero / `Infinity` / `NaN`).
 *
 * @example
 * safeDivide(10, 2) // 5
 * safeDivide(10, 0) // 0
 */
export function safeDivide(value1: number, value2?: number): number {
  return value2 && value2 > 0 ? value1 / value2 : 0;
}
