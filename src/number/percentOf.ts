import { presentNumber } from './internal/presentNumber.js';

export interface PercentOfOptions {
  /** Returned when the percentage can't be computed (missing part, total ≤ 0). Defaults to `0`. */
  fallback?: number;
}

/**
 * What percentage `part` is of `total` (`part / total * 100`), without the
 * `NaN`/`Infinity` of a raw division. Returns `fallback` when `part` is
 * missing or `total` is missing, zero or negative. Pair with
 * `formatPercentage` to display it.
 *
 * @example
 * percentOf(25, 200) // 12.5
 * percentOf(5, 0) // 0
 * percentOf(0, 0, { fallback: 100 }) // 100 (nothing to load = done)
 */
export function percentOf(
  part?: number | null,
  total?: number | null,
  options: PercentOfOptions = {},
): number {
  const { fallback = 0 } = options;
  const value = presentNumber(part);
  const base = presentNumber(total);
  if (value === undefined || base === undefined || base <= 0) {
    return fallback;
  }
  return (value / base) * 100;
}
