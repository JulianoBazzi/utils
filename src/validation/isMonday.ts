import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { isDayOfWeek } from './isDayOfWeek.js';

/**
 * Check whether a date falls on a Monday. Returns `false` for missing/invalid input.
 * Shorthand for `isDayOfWeek(value, 1)`; the seven `is<Day>` helpers will be
 * folded into {@link isDayOfWeek} in 2.0.
 *
 * @example
 * isMonday("2026-07-06") // true
 * isMonday("2026-07-07") // false
 */
export function isMonday(value?: DateInput): boolean;
export function isMonday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isMonday(value?: DateInput, options?: TimeZoneOptions): boolean {
  return isDayOfWeek(value, 1, options);
}
