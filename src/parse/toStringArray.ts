/**
 * Narrow an unknown value to an array of strings, dropping every entry of
 * another type — the guard an imported JSON file or an untyped API payload
 * needs before it reaches typed code. Anything that is not an array yields `[]`.
 *
 * Note this filters by type rather than wrapping: a bare string comes back as
 * `[]`, not as a one-element array.
 *
 * @example
 * toStringArray(["a", 1, null, "b"]) // ["a", "b"]
 * toStringArray("a") // []
 * toStringArray(undefined) // []
 */
export function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}
