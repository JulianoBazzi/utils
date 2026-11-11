import type { DateInput, TimeZoneOptions } from '../date/types.js';
import { getAge } from './getAge.js';
import { countLabel } from './internal/pluralize.js';

export interface FormatAgeOptions extends TimeZoneOptions {
  /** Returned when the input is missing (`null`, `undefined` or `""`). Defaults to `""`. */
  fallback?: string;
}

/**
 * Age in full years for a birth date, formatted in Portuguese (e.g. `"36 anos"`, `"1 ano"`).
 * Returns `fallback` only for missing input; an invalid date or a future birth
 * date fall through to `getAge` and render as `"0 anos"`.
 *
 * @example
 * formatAge("1990-07-01") // "36 anos"
 * formatAge("2030-01-01") // "0 anos"
 * formatAge() // ""
 */
export function formatAge(birthDate?: DateInput, options: FormatAgeOptions = {}): string {
  const { fallback = '', timeZone } = options;
  if (birthDate === null || birthDate === undefined || birthDate === '') return fallback;

  return countLabel(getAge(birthDate, { timeZone }), 'ano', 'anos');
}
