import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Thursday. Returns `false` for missing/invalid input.
 *
 * @example
 * isThursday("2026-07-09") // true
 * isThursday("2026-07-10") // false
 */
export function isThursday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 4;
}
