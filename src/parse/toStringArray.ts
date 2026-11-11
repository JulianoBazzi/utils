export interface ToStringArrayOptions {
  /** Wrap a non-empty string into `[value]` instead of returning `[]`. Defaults to `false`. */
  wrap?: boolean;
}

/**
 * Narrow an unknown value to an array of strings, dropping every entry of
 * another type — the guard an imported JSON file or an untyped API payload
 * needs before it reaches typed code. Anything that is not an array yields `[]`.
 *
 * By default this filters by type rather than wrapping: a bare string comes
 * back as `[]`. Pass `{ wrap: true }` to turn a non-empty string into a
 * one-element array — the shape of a `string | string[]` query value.
 *
 * @example
 * toStringArray(["a", 1, null, "b"]) // ["a", "b"]
 * toStringArray("a") // []
 * toStringArray("a", { wrap: true }) // ["a"]
 * toStringArray(undefined) // []
 */
export function toStringArray(value: unknown, options: ToStringArrayOptions = {}): string[] {
  if (options.wrap && typeof value === 'string') {
    return value ? [value] : [];
  }
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}
