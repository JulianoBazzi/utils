import { readTimeZone } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a weekday (Monday to Friday). Returns `false`
 * for missing/invalid input. Safe to pass straight to `.filter`.
 *
 * @example
 * isWeekday("2026-07-06") // true (Monday)
 * isWeekday("2026-07-05") // false (Sunday)
 */
export function isWeekday(value?: DateInput): boolean;
export function isWeekday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isWeekday(value?: DateInput, options?: unknown): boolean {
  const day = getDayOfWeek(value, readTimeZone(options));
  return day !== null && day >= 1 && day <= 5;
}
