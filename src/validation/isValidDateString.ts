import { isValidCalendarDate } from '../date/internal/calendar.js';
import type { DateString } from '../date/types.js';

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Check whether a value is a `YYYY-MM-DD` string **and** a real calendar date,
 * so `"2024-02-30"` and `"2024-13-01"` are rejected (unlike
 * {@link isDateString}, which only checks the shape). The guard narrows to
 * {@link DateString} without narrowing the `else` branch.
 *
 * @example
 * isValidDateString("2024-02-29") // true
 * isValidDateString("2023-02-29") // false
 * isValidDateString("2024-1-5") // false
 */
export function isValidDateString(value?: unknown): value is DateString {
  if (typeof value !== 'string') {
    return false;
  }
  const match = DATE_PATTERN.exec(value);
  return (
    match !== null && isValidCalendarDate(Number(match[1]), Number(match[2]), Number(match[3]))
  );
}
