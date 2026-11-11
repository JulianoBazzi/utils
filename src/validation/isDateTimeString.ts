import { isValidIsoParts, matchIsoDate } from '../date/internal/calendar.js';
import type { DateTimeString } from '../date/types.js';

const DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$/i;

/**
 * Check whether a string is a date-time: `YYYY-MM-DD`, then `T` or a space,
 * then `HH:mm`, optionally followed by `:ss`, fractional seconds and a `Z` /
 * `±hh:mm` offset. Both the ISO `T` and the SQL-style space separator are
 * accepted. Trailing text and impossible dates or times are rejected.
 *
 * @example
 * isDateTimeString("2026-06-25T11:04:23") // true
 * isDateTimeString("2026-06-25 11:04") // true
 * isDateTimeString("2026-06-25T11:04:23.000Z") // true
 * isDateTimeString("2026-06-25 11:04abc") // false
 * isDateTimeString("2026-02-30T10:00") // false
 * isDateTimeString("2026-06-25") // false
 */
export function isDateTimeString(value?: unknown): value is DateTimeString {
  if (typeof value !== 'string' || !DATE_TIME_PATTERN.test(value)) {
    return false;
  }
  const parts = matchIsoDate(value);
  return parts !== null && isValidIsoParts(parts);
}
