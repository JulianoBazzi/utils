import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Tuesday. Returns `false` for missing/invalid input.
 *
 * @example
 * isTuesday("2026-07-07") // true
 * isTuesday("2026-07-08") // false
 */
export function isTuesday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 2;
}
