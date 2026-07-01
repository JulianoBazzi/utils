const DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?/;

/**
 * Check whether a string is a date-time: `YYYY-MM-DD` followed by `T` or a
 * space and `HH:mm` (optionally `:ss`). Accepts both the ISO `T` separator and
 * the SQL-style space separator (e.g. `2026-06-25 11:04:23`).
 *
 * @example
 * isDateTimeString("2026-06-25T11:04:23") // true
 * isDateTimeString("2026-06-25 11:04") // true
 * isDateTimeString("2026-06-25") // false
 */
export function isDateTimeString(value?: string | null): boolean {
  return typeof value === 'string' && DATE_TIME_PATTERN.test(value);
}
