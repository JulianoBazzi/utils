import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Sunday. Returns `false` for missing/invalid input.
 *
 * @example
 * isSunday("2026-07-05") // true
 * isSunday("2026-07-06") // false
 */
export function isSunday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 0;
}
