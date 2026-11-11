import type { DateRange } from '../date/getDateRange.js';
import { normalizeDateRange } from '../date/normalizeDateRange.js';
import { toSearchParams } from './internal/toSearchParams.js';
import { readQueryDate } from './readQueryDate.js';
import type { QuerySource } from './types.js';

export interface ReadQueryRangeOptions {
  /** Earliest allowed day, `YYYY-MM-DD` (e.g. the day the operation started). */
  min?: string;
  /** Latest allowed day, `YYYY-MM-DD` (e.g. today). */
  max?: string;
}

/**
 * Read a `YYYY-MM-DD` range from two keys. Each missing or invalid end falls
 * back to the `fallback`'s; an inverted range is swapped and the result is
 * clamped into `[min, max]` (see `normalizeDateRange`). Never throws and
 * never returns `startDate > endDate`.
 *
 * @example
 * const fallback = { startDate: "2026-03-01", endDate: "2026-03-31" };
 * readQueryRange("start=2026-03-10&end=2026-03-01", ["start", "end"], fallback)
 * // { startDate: "2026-03-01", endDate: "2026-03-10" }
 * readQueryRange("start=nope", ["start", "end"], fallback) // fallback
 */
export function readQueryRange(
  query: QuerySource,
  keys: readonly [start: string, end: string],
  fallback: DateRange,
  options: ReadQueryRangeOptions = {},
): DateRange {
  const params = toSearchParams(query);
  return normalizeDateRange(
    {
      startDate: readQueryDate(params, keys[0]) ?? fallback.startDate,
      endDate: readQueryDate(params, keys[1]) ?? fallback.endDate,
    },
    options,
  );
}
