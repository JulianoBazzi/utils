import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Saturday. Returns `false` for missing/invalid input.
 *
 * @example
 * isSaturday("2026-07-11") // true
 * isSaturday("2026-07-12") // false
 */
export function isSaturday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 6;
}
