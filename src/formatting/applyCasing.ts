import { titleCase } from './internal/casing.js';

export type LetterCasing = 'lowercase' | 'uppercase' | 'titlecase';

export interface ApplyCasingOptions {
  /**
   * With `titlecase`, words kept in lowercase unless they open the text —
   * e.g. `["de", "da", "do", "dos", "das", "e"]` for Portuguese names.
   * Compared case-insensitively.
   */
  lowercaseWords?: readonly string[];
}

/**
 * Transform a string's letter casing. `titlecase` uppercases the first letter
 * of each word while preserving the rest (so unit symbols like `"KB"` survive).
 * Returns the value unchanged when no casing is provided.
 *
 * @example
 * applyCasing("são paulo", "uppercase") // "SÃO PAULO"
 * applyCasing("são paulo", "titlecase") // "São Paulo"
 * applyCasing("1.50 KB", "titlecase") // "1.50 KB"
 * applyCasing("joão da silva", "titlecase", { lowercaseWords: ["da"] }) // "João da Silva"
 */
export function applyCasing(
  value: string,
  casing?: LetterCasing,
  options: ApplyCasingOptions = {},
): string {
  switch (casing) {
    case 'lowercase':
      return value.toLowerCase();
    case 'uppercase':
      return value.toUpperCase();
    case 'titlecase':
      return titleCase(value, { lowercaseWords: options.lowercaseWords });
    default:
      return value;
  }
}
