import type { DateRange } from './getDateRange.js';

export interface NormalizeDateRangeOptions {
  /** Earliest allowed day, `YYYY-MM-DD` — e.g. the day the operation started. */
  min?: string;
  /** Latest allowed day, `YYYY-MM-DD` — e.g. today. */
  max?: string;
}

/**
 * Make a `YYYY-MM-DD` range safe to query with: swaps inverted ends, then
 * clamps both ends into `[min, max]`. When clamping pushes the whole range
 * outside the window, it collapses to the nearest edge (`min` wins if `min` is
 * after `max`). The result never has `startDate > endDate`.
 *
 * @example
 * normalizeDateRange({ startDate: "2026-03-10", endDate: "2026-03-01" })
 * // { startDate: "2026-03-01", endDate: "2026-03-10" }
 * normalizeDateRange({ startDate: "2026-01-01", endDate: "2026-03-10" }, { min: "2026-02-01" })
 * // { startDate: "2026-02-01", endDate: "2026-03-10" }
 * normalizeDateRange({ startDate: "2025-01-01", endDate: "2025-01-31" }, { min: "2026-02-01" })
 * // { startDate: "2026-02-01", endDate: "2026-02-01" }
 */
export function normalizeDateRange(
  range: DateRange,
  options: NormalizeDateRangeOptions = {},
): DateRange {
  const { min, max } = options;
  let [startDate, endDate] =
    range.startDate > range.endDate
      ? [range.endDate, range.startDate]
      : [range.startDate, range.endDate];

  if (min && startDate < min) startDate = min;
  if (max && endDate > max) endDate = max;
  if (min && endDate < min) endDate = min;
  if (startDate > endDate) startDate = endDate;

  return { startDate, endDate };
}
