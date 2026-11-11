import { applyCasing, type LetterCasing } from './applyCasing.js';
import { removeAccents } from './removeAccents.js';

export interface OnlyAlphanumericOptions {
  /** Casing of the result. Defaults to `"uppercase"`; `"none"` keeps the input's casing. */
  casing?: LetterCasing | 'none';
}

/**
 * Strip every non-alphanumeric character, after removing accents (so
 * `"João"` keeps its `a`), and uppercase the result by default — the shape
 * an alphanumeric CNPJ needs. Returns an empty string for missing input.
 *
 * @example
 * onlyAlphanumeric("12.abc-345") // "12ABC345"
 * onlyAlphanumeric("João") // "JOAO"
 * onlyAlphanumeric("João-1", { casing: "none" }) // "Joao1"
 */
export function onlyAlphanumeric(
  value?: string | null,
  options: OnlyAlphanumericOptions = {},
): string {
  if (!value) return '';
  const { casing = 'uppercase' } = options;
  const cleaned = removeAccents(value).replace(/[^0-9a-zA-Z]/g, '');
  return casing === 'none' ? cleaned : applyCasing(cleaned, casing);
}
