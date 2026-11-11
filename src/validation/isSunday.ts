import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Sunday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 0)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isSunday("2026-07-05") // true
 * isSunday("2026-07-06") // false
 */
export function isSunday(value?: DateInput): boolean;
export function isSunday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isSunday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 0, options);
}
