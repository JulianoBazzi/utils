import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a Wednesday. Returns `false` for missing/invalid input.
 *
 * @example
 * isWednesday("2026-07-08") // true
 * isWednesday("2026-07-09") // false
 */
export function isWednesday(value?: Date | string | null): boolean {
  return getDayOfWeek(value) === 3;
}
