const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Check whether a string is an ISO date `YYYY-MM-DD` (without a time part).
 *
 * @example
 * isDateString("2026-06-25") // true
 * isDateString("2026-06-25 11:04:23") // false
 */
export function isDateString(value?: string | null): boolean {
  return typeof value === 'string' && DATE_PATTERN.test(value);
}
