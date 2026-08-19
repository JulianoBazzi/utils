import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Friday. Returns `false` for missing/invalid input.
 *
 * @example
 * isFriday("2026-07-10") // true
 * isFriday("2026-07-11") // false
 */
export function isFriday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 5;
}
