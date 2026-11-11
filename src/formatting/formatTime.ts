import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { timePattern } from './internal/datePattern.js';

export interface FormatTimeOptions extends TimeZoneOptions {
  /** Include seconds (`HH:mm:ss`). Takes precedence over `simplified`. */
  seconds?: boolean;
  /** Legacy flag: `HH:mm` when `true` (default), `HH:mm:ss` when `false`. Prefer `seconds`. */
  simplified?: boolean;
  /** Returned when the input is empty or not a valid date/time. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format the time of a date as `HH:mm` (or `HH:mm:ss`). Besides full dates it
 * accepts a bare time such as `"13:45"` or `"13:45:00"`, the shape APIs return
 * for time columns.
 *
 * @example
 * formatTime("2024-01-02T13:45:30") // "13:45"
 * formatTime("13:45:00") // "13:45"
 * formatTime("13:45:00", { seconds: true }) // "13:45:00"
 * formatTime(null, { fallback: "-" }) // "-"
 */
export function formatTime(value?: DateInput, options: FormatTimeOptions = {}): string {
  const { seconds, simplified = true, fallback = '', timeZone } = options;
  const date = parseDate(value, { timeZone, timeOnly: true });
  return date ? date.format(timePattern(seconds, !simplified)) : fallback;
}
