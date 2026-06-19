import { applyCasing, type LetterCasing } from './applyCasing.js';

interface FormatBooleanOptions {
  /** Letter casing of the output. Defaults to no transformation. */
  casing?: LetterCasing;
}

/**
 * Format a boolean as a Portuguese yes/no label.
 *
 * @example
 * formatBoolean(true) // "Sim"
 * formatBoolean(false) // "Não"
 * formatBoolean(true, { casing: "uppercase" }) // "SIM"
 */
export function formatBoolean(value?: boolean | null, options: FormatBooleanOptions = {}): string {
  return applyCasing(value ? 'Sim' : 'Não', options.casing);
}
