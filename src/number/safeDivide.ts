import { presentNumber } from './internal/presentNumber.js';

export interface SafeDivideOptions {
  /** Divide by negative numbers too. Defaults to `false` (a negative divisor yields `fallback`). */
  allowNegativeDivisor?: boolean;
  /** Returned when the division is not possible. Defaults to `0`. */
  fallback?: number;
}

/**
 * Divide without `Infinity`/`NaN` surprises. Returns `fallback` (default `0`)
 * when the numerator is missing or not finite, or when the divisor is missing,
 * zero or negative (allow negatives with `allowNegativeDivisor`).
 *
 * @example
 * safeDivide(10, 2) // 5
 * safeDivide(10, 0) // 0
 * safeDivide(10, -2) // 0
 * safeDivide(10, -2, { allowNegativeDivisor: true }) // -5
 * safeDivide(null, 2) // 0
 */
export function safeDivide(
  value1?: number | null,
  value2?: number | null,
  options: SafeDivideOptions = {},
): number {
  const { allowNegativeDivisor = false, fallback = 0 } = options;
  const numerator = presentNumber(value1);
  const divisor = presentNumber(value2);

  if (numerator === undefined || !divisor || (divisor < 0 && !allowNegativeDivisor)) {
    return fallback;
  }
  return numerator / divisor;
}
