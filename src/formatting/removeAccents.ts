// Combining diacritical marks block (U+0300–U+036F).
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Remove diacritics/accents from a string, preserving case and other
 * characters. Uses Unicode NFD decomposition + stripping combining marks.
 * Returns an empty string for missing input.
 *
 * @example
 * removeAccents("João Coração") // "Joao Coracao"
 * removeAccents("ÁÉÍÓÚ") // "AEIOU"
 */
export function removeAccents(value?: string | null): string {
  if (!value) return "";
  return value.normalize("NFD").replace(COMBINING_MARKS, "");
}
