const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Check whether a string has the ISO date shape `YYYY-MM-DD` (without a time
 * part). It checks the **format only**: `"2024-02-30"` passes. Use
 * {@link isValidDateString} to also reject impossible calendar dates.
 *
 * @example
 * isDateString("2026-06-25") // true
 * isDateString("2026-02-30") // true (format only)
 * isDateString("2026-06-25 11:04:23") // false
 */
export function isDateString(value?: string | null): boolean {
  return typeof value === 'string' && DATE_PATTERN.test(value);
}
