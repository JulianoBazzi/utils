import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Wednesday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 3)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isWednesday("2026-07-08") // true
 * isWednesday("2026-07-09") // false
 */
export function isWednesday(value?: DateInput): boolean;
export function isWednesday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isWednesday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 3, options);
}
