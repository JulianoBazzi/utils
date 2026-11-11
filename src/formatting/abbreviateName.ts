import { applyCasing, type LetterCasing } from './applyCasing.js';
import { titleCase } from './internal/casing.js';

export interface AbbreviateNameOptions {
  /**
   * Letter casing applied to the name before abbreviating. Defaults to no
   * transformation. `titlecase` here *normalizes* (lowercases first), so
   * `"JOAO SILVA"` becomes `"Joao S."`.
   */
  casing?: LetterCasing;
}

/**
 * Abbreviate a full name to first name + initial of the **last** name
 * (`"Maria de Souza"` → `"Maria S."`). Single-word names come back trimmed.
 * Empty/blank/missing input → `""`.
 *
 * @example
 * abbreviateName("John Smith") // "John S."
 * abbreviateName("Maria de Souza") // "Maria S."
 * abbreviateName("John") // "John"
 * abbreviateName("JOAO SILVA", { casing: "titlecase" }) // "Joao S."
 */
export function abbreviateName(name?: string | null, options: AbbreviateNameOptions = {}): string {
  const trimmed = name?.trim();
  if (!trimmed) {
    return '';
  }

  const { casing } = options;
  const cased =
    casing === 'titlecase' ? titleCase(trimmed, { normalize: true }) : applyCasing(trimmed, casing);

  const words = cased.split(/\s+/);
  const first = words[0] as string;
  const last = words.length > 1 ? words.at(-1) : undefined;

  return last ? `${first} ${last.charAt(0)}.` : first;
}
