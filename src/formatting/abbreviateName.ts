import { applyCasing, type LetterCasing } from './applyCasing.js';
import { titleCase } from './internal/casing.js';

interface AbbreviateNameOptions {
  /**
   * Letter casing applied to the name before abbreviating. Defaults to no
   * transformation. `titlecase` here *normalizes* (lowercases first), so
   * `"JOAO SILVA"` becomes `"Joao S."`.
   */
  casing?: LetterCasing;
}

/** Title-case that normalizes: lowercases everything, then capitalizes each word. */
/**
 * Abbreviate a full name to first name + last initial (e.g. `"John S."`).
 * Single-word names are returned unchanged. Empty/blank/missing input → `""`.
 *
 * @example
 * abbreviateName("John Smith") // "John S."
 * abbreviateName("John") // "John"
 * abbreviateName("JOAO SILVA", { casing: "titlecase" }) // "Joao S."
 */
export function abbreviateName(name?: string | null, options: AbbreviateNameOptions = {}): string {
  if (!name?.trim()) {
    return '';
  }

  const { casing } = options;
  const cased =
    casing === 'titlecase' ? titleCase(name, { normalize: true }) : applyCasing(name, casing);

  const words = cased.trim().split(/\s+/);
  const [first, second] = words;

  if (second) {
    return `${first} ${second.charAt(0)}.`;
  }

  return cased;
}
