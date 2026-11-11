import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { datePattern, type YearStyle } from './internal/datePattern.js';

export interface FormatDateRangeOptions extends TimeZoneOptions {
  /** Placed between the two dates. Defaults to `" a "` ("de X a Y"). */
  separator?: string;
  /**
   * Text appended when only the start is known, e.g. `"em diante"` →
   * `"01/01/24 em diante"`. Without it, a missing end returns `fallback`.
   */
  openEnd?: string;
  /** How the year is rendered, as in `formatDate`. Defaults to `"2-digit"`. */
  year?: YearStyle;
  /** Returned when the start is missing/invalid (or the end, without `openEnd`). Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a period as `"DD/MM/YY a DD/MM/YY"`. The same day on both ends
 * renders once; an open end uses `openEnd` when given.
 *
 * @example
 * formatDateRange("2024-01-01", "2024-01-31") // "01/01/24 a 31/01/24"
 * formatDateRange("2024-01-01", "2024-01-01") // "01/01/24"
 * formatDateRange("2024-01-01", null, { openEnd: "em diante" }) // "01/01/24 em diante"
 * formatDateRange(null, null, { fallback: "Ocasional" }) // "Ocasional"
 */
export function formatDateRange(
  start?: DateInput,
  end?: DateInput,
  options: FormatDateRangeOptions = {},
): string {
  const { separator = ' a ', openEnd, year, fallback = '', timeZone } = options;
  const pattern = datePattern(year);

  const from = parseDate(start, { timeZone });
  if (!from) {
    return fallback;
  }

  const to = parseDate(end, { timeZone });
  if (!to) {
    return openEnd ? `${from.format(pattern)} ${openEnd}` : fallback;
  }

  if (from.isSame(to, 'day')) {
    return from.format(pattern);
  }

  return `${from.format(pattern)}${separator}${to.format(pattern)}`;
}
