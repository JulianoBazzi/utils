import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Saturday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 6)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isSaturday("2026-07-11") // true
 * isSaturday("2026-07-12") // false
 */
export function isSaturday(value?: DateInput): boolean;
export function isSaturday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isSaturday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 6, options);
}
