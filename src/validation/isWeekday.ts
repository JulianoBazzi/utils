import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a weekday (Monday to Friday). Returns `false`
 * for missing/invalid input.
 *
 * @example
 * isWeekday("2026-07-06") // true (Monday)
 * isWeekday("2026-07-05") // false (Sunday)
 */
export function isWeekday(value?: Date | string | null): boolean {
  const day = getDayOfWeek(value);
  return day !== null && day >= 1 && day <= 5;
}
