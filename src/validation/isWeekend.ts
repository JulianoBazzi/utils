import { readTimeZone } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { getDayOfWeek } from './internal/getDayOfWeek.js';

/**
 * Check whether a date falls on a weekend (Saturday or Sunday). Returns `false`
 * for missing/invalid input. Safe to pass straight to `.filter`.
 *
 * @example
 * isWeekend("2026-07-05") // true (Sunday)
 * isWeekend("2026-07-06") // false (Monday)
 */
export function isWeekend(value?: DateInput): boolean;
export function isWeekend(value: DateInput, options?: TimeZoneOptions): boolean;
export function isWeekend(value?: DateInput, options?: unknown): boolean {
  const day = getDayOfWeek(value, readTimeZone(options));
  return day === 0 || day === 6;
}
