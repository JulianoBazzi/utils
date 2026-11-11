import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Friday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 5)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isFriday("2026-07-10") // true
 * isFriday("2026-07-11") // false
 */
export function isFriday(value?: DateInput): boolean;
export function isFriday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isFriday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 5, options);
}
