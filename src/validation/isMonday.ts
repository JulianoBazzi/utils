import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Monday. Returns `false` for missing/invalid input.
 *
 * @example
 * isMonday("2026-07-06") // true
 * isMonday("2026-07-07") // false
 */
export function isMonday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 1;
}
