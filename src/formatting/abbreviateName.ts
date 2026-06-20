import { applyCasing, type LetterCasing } from './applyCasing.js';

interface AbbreviateNameOptions {
  /**
   * Letter casing applied to the name before abbreviating. Defaults to no
   * transformation. `titlecase` here *normalizes* (lowercases first), so
   * `"JOAO SILVA"` becomes `"Joao S."`.
   */
  casing?: LetterCasing;
}

/** Title-case that normalizes: lowercases everything, then capitalizes each word. */
function normalizeTitleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

/**
 * Abbreviate a full name to first name + last initial (e.g. `"John S."`).
 * Single-word names are returned unchanged. Empty/missing input → `""`.
 *
 * @example
 * abbreviateName("John Smith") // "John S."
 * abbreviateName("John") // "John"
 * abbreviateName("JOAO SILVA", { casing: "titlecase" }) // "Joao S."
 */
export function abbreviateName(name?: string | null, options: AbbreviateNameOptions = {}): string {
  if (!name) {
    return '';
  }

  const { casing } = options;
  const cased = casing === 'titlecase' ? normalizeTitleCase(name) : applyCasing(name, casing);

  const words = cased.trim().split(/\s+/);
  const [first, second] = words;

  if (second) {
    return `${first} ${second.charAt(0)}.`;
  }

  return cased;
}
