import { getAge } from './getAge.js';
import { countLabel } from './internal/pluralize.js';

interface FormatAgeOptions {
  /** Returned when the input is missing/invalid or in the future. Defaults to `""`. */
  fallback?: string;
}

/**
 * Age in full years for a birth date, formatted in Portuguese (e.g. `"36 anos"`, `"1 ano"`).
 * Returns `fallback` for missing input; invalid input or a future birth date fall
 * through to `getAge` and render as `"0 anos"`.
 *
 * @example
 * formatAge("1990-07-01") // "36 anos"
 * formatAge("2030-01-01") // "0 anos"
 * formatAge() // ""
 */
export function formatAge(
  birthDate?: Date | string | null,
  options: FormatAgeOptions = {},
): string {
  const { fallback = '' } = options;
  if (!birthDate) return fallback;

  const age = getAge(birthDate);
  return countLabel(age, 'ano', 'anos');
}
