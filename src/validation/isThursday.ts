import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Thursday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 4)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isThursday("2026-07-09") // true
 * isThursday("2026-07-10") // false
 */
export function isThursday(value?: DateInput): boolean;
export function isThursday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isThursday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 4, options);
}
