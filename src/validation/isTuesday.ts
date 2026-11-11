import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Tuesday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 2)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isTuesday("2026-07-07") // true
 * isTuesday("2026-07-08") // false
 */
export function isTuesday(value?: DateInput): boolean;
export function isTuesday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isTuesday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 2, options);
}
