import { applyCasing, type LetterCasing } from './applyCasing.js';

export interface FormatBooleanOptions {
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
  /** Returned for `null`/`undefined`. Defaults to `"Não"` (same as `false`). */
  fallback?: string;
}

/**
 * Format a boolean as a Portuguese yes/no label. `null`/`undefined` read as
 * `"Não"` unless `fallback` is given.
 *
 * @example
 * formatBoolean(true) // "Sim"
 * formatBoolean(false) // "Não"
 * formatBoolean(null, { fallback: "-" }) // "-"
 * formatBoolean(true, { casing: "uppercase" }) // "SIM"
 */
export function formatBoolean(value?: boolean | null, options: FormatBooleanOptions = {}): string {
  const { casing, fallback } = options;
  if (value == null && fallback !== undefined) {
    return fallback;
  }
  return applyCasing(value ? 'Sim' : 'Não', casing);
}
