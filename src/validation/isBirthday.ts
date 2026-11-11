import { isLeapYear } from '../date/internal/calendar.js';
import { parseDate } from '../date/internal/parseDate.js';
import { nowIn, readTimeZone } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';

/**
 * Check whether a date falls on today's day and month (a birthday), "today"
 * being read in `timeZone` when given. Someone born on 29 February celebrates
 * on 28 February in non-leap years. Returns `false` for missing/invalid input.
 *
 * @example
 * isBirthday(new Date()) // true
 * isBirthday("1990-07-01", { timeZone: "America/Sao_Paulo" })
 */
export function isBirthday(value?: DateInput): boolean;
export function isBirthday(value: DateInput, options?: TimeZoneOptions): boolean;
export function isBirthday(value?: DateInput, options?: unknown): boolean {
  const timeZone = readTimeZone(options);
  const birth = parseDate(value, { timeZone });
  if (!birth) {
    return false;
  }

  const today = nowIn(timeZone);
  let day = birth.date();
  if (birth.month() === 1 && day === 29 && !isLeapYear(today.year())) {
    day = 28;
  }

  return today.month() === birth.month() && today.date() === day;
}
