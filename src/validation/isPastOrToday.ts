import { parseDate } from '../date/internal/parseDate.js';
import { nowIn } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';

export interface IsPastOrTodayOptions extends TimeZoneOptions {
  /** Day to compare against. Defaults to today (in `timeZone` when given). */
  reference?: DateInput;
}

/**
 * Check whether a date is on or before the reference day (today by default),
 * comparing calendar days only. Returns `false` for missing/invalid input.
 *
 * @example
 * isPastOrToday("2020-01-01") // true
 * isPastOrToday("2026-07-22", { reference: "2026-07-21" }) // false
 */
export function isPastOrToday(value?: DateInput, options: IsPastOrTodayOptions = {}): boolean {
  const { reference, timeZone } = options;
  const date = parseDate(value, { timeZone });
  const limit = reference ? parseDate(reference, { timeZone }) : nowIn(timeZone);
  return date !== null && limit !== null && !date.isAfter(limit, 'day');
}
