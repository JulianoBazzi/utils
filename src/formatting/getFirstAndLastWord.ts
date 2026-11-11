import { applyCasing, type LetterCasing } from './applyCasing.js';

export interface GetFirstAndLastWordOptions {
  /** Returned when the input is empty/blank/missing. Defaults to `""`. */
  fallback?: string;
  /** Letter casing applied to the result. Defaults to no transformation. */
  casing?: LetterCasing;
}

/**
 * Keep only the first and last word of a text, dropping everything between —
 * the way a long job title is shortened to fit a sidebar. Unlike
 * `abbreviateName`, which reduces the last word to an initial, both words come
 * back whole.
 *
 * Texts of a single word are returned unchanged; empty or blank input yields
 * `fallback`.
 *
 * @example
 * getFirstAndLastWord("Analista de Sistemas") // "Analista Sistemas"
 * getFirstAndLastWord("Gerente") // "Gerente"
 * getFirstAndLastWord(null, { fallback: "Não Informado" }) // "Não Informado"
 */
export function getFirstAndLastWord(
  value?: string | null,
  options: GetFirstAndLastWordOptions = {},
): string {
  const { fallback = '', casing } = options;

  if (!value?.trim()) {
    return fallback;
  }

  const words = value.trim().split(/\s+/);
  const first = words[0] as string;
  const last = words[words.length - 1] as string;
  const result = words.length > 1 ? `${first} ${last}` : first;

  return applyCasing(result, casing);
}
