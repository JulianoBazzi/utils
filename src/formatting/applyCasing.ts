export type LetterCasing = 'lowercase' | 'uppercase' | 'titlecase';

/**
 * Transform a string's letter casing. `titlecase` uppercases the first letter
 * of each word while preserving the rest (so unit symbols like `"KB"` survive).
 * Returns the value unchanged when no casing is provided.
 *
 * @example
 * applyCasing("são paulo", "uppercase") // "SÃO PAULO"
 * applyCasing("são paulo", "titlecase") // "São Paulo"
 * applyCasing("1.50 KB", "titlecase") // "1.50 KB"
 */
export function applyCasing(value: string, casing?: LetterCasing): string {
  switch (casing) {
    case 'lowercase':
      return value.toLowerCase();
    case 'uppercase':
      return value.toUpperCase();
    case 'titlecase':
      return value.replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
    default:
      return value;
  }
}
