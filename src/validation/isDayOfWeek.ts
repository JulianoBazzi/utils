import { readTimeZone } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { getDayOfWeek } from './internal/getDayOfWeek.js';

/** Day of the week index: `0` = Sunday … `6` = Saturday (same as `Date#getDay`). */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Check whether a date falls on the given day of the week (`0` = Sunday …
 * `6` = Saturday). Returns `false` for missing/invalid input.
 *
 * @example
 * isDayOfWeek("2026-07-06", 1) // true (Monday)
 * isDayOfWeek("2026-07-06T02:00:00Z", 0, { timeZone: "America/Sao_Paulo" }) // true (still Sunday in SP)
 */
export function isDayOfWeek(value: DateInput, day: DayOfWeek, options?: TimeZoneOptions): boolean {
  return getDayOfWeek(value, readTimeZone(options)) === day;
}
