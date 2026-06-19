/**
 * Abbreviate a full name to first name + last initial (e.g. `"John S."`).
 * Single-word names are returned unchanged. Empty/missing input → `""`.
 *
 * @example
 * abbreviateName("John Smith") // "John S."
 * abbreviateName("John") // "John"
 */
export function abbreviateName(name?: string): string {
  if (!name) {
    return '';
  }

  const words = name.trim().split(/\s+/);
  const [first, second] = words;

  if (second) {
    return `${first} ${second.charAt(0)}.`;
  }

  return name;
}
