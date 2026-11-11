import { parseDate } from '../date/internal/parseDate.js';
import { nowIn, readTimeZone } from '../date/internal/timeZone.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';

/**
 * Age in full years for a birth date, based on today (in `timeZone` when
 * given). Returns `0` for missing/invalid input or a birth date in the future.
 * `YYYY-MM-DD` strings are read as local calendar dates (no UTC off-by-one).
 *
 * @example
 * getAge("1990-07-01") // e.g. 36
 * getAge("1990-07-01", { timeZone: "America/Sao_Paulo" })
 * getAge() // 0
 */
export function getAge(birthDate?: DateInput): number;
export function getAge(birthDate: DateInput, options?: TimeZoneOptions): number;
export function getAge(birthDate?: DateInput, options?: unknown): number {
  const timeZone = readTimeZone(options);
  const birth = parseDate(birthDate, { timeZone });
  if (!birth) return 0;

  return Math.max(nowIn(timeZone).diff(birth, 'year'), 0);
}
