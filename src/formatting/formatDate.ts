import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { datePattern, type YearStyle } from './internal/datePattern.js';

export interface FormatDateOptions extends TimeZoneOptions {
  /** How the year is rendered. Takes precedence over `simplified`. */
  year?: YearStyle;
  /** Legacy flag: 2-digit year when `true` (default), 4-digit when `false`. Prefer `year`. */
  simplified?: boolean;
  /** Returned when the input is empty or not a real date. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date as `DD/MM/YY` (or `DD/MM/YYYY`, or `DD/MM` with `year: false`).
 * Impossible dates such as `"2024-02-30"` return `fallback` instead of rolling
 * over; `"Invalid Date"` is never returned.
 *
 * @example
 * formatDate("2024-01-02") // "02/01/24"
 * formatDate("2024-01-02", { year: "numeric" }) // "02/01/2024"
 * formatDate("2024-01-02", { year: false }) // "02/01"
 * formatDate("2024-02-30", { fallback: "-" }) // "-"
 * formatDate("2024-01-02T02:00:00Z", { timeZone: "America/Sao_Paulo" }) // "01/01/24"
 */
export function formatDate(value?: DateInput, options: FormatDateOptions = {}): string {
  const { year, simplified, fallback = '', timeZone } = options;
  const date = parseDate(value, { timeZone });
  return date ? date.format(datePattern(year, simplified)) : fallback;
}
