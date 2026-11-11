import { parseDate } from '../date/internal/parseDate.js';
import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { datePattern, timePattern, type YearStyle } from './internal/datePattern.js';

export interface FormatDateTimeOptions extends TimeZoneOptions {
  /** How the year is rendered. Takes precedence over `simplified`. */
  year?: YearStyle;
  /** Include seconds (`HH:mm:ss`). Takes precedence over `showSeconds`. */
  seconds?: boolean;
  /** Legacy flag: 2-digit year when `true` (default), 4-digit when `false`. Prefer `year`. */
  simplified?: boolean;
  /** Legacy flag: include seconds when `true`. Defaults to `false`. Prefer `seconds`. */
  showSeconds?: boolean;
  /** Returned when the input is empty or not a real date. Defaults to `""`. */
  fallback?: string;
}

/**
 * Format a date as `DD/MM/YY HH:mm`. `year` controls the year (`"numeric"`,
 * `"2-digit"` or `false` to drop it) and `seconds` appends `:ss`. Missing or
 * invalid input → `fallback`.
 *
 * @example
 * formatDateTime("2024-01-02T13:45:30") // "02/01/24 13:45"
 * formatDateTime("2024-01-02T13:45:30", { year: "numeric" }) // "02/01/2024 13:45"
 * formatDateTime("2024-01-02T13:45:30", { year: false }) // "02/01 13:45"
 * formatDateTime("2024-01-02T13:45:30", { seconds: true }) // "02/01/24 13:45:30"
 * formatDateTime(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function formatDateTime(date?: DateInput, options: FormatDateTimeOptions = {}): string {
  const { year, seconds, simplified, showSeconds, fallback = '', timeZone } = options;
  const parsed = parseDate(date, { timeZone });
  if (!parsed) return fallback;

  return parsed.format(`${datePattern(year, simplified)} ${timePattern(seconds, showSeconds)}`);
}
