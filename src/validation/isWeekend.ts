import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a weekend (Saturday or Sunday). Returns `false`
 * for missing/invalid input.
 *
 * @example
 * isWeekend("2026-07-05") // true (Sunday)
 * isWeekend("2026-07-06") // false (Monday)
 */
export function isWeekend(value?: Date | string | null): boolean {
  const day = getDayOfWeek(value);
  return day === 0 || day === 6;
}
