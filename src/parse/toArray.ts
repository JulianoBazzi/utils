/**
 * Wrap a single value in an array, or copy an array, dropping `null` and
 * `undefined` along the way. Missing input yields `[]`.
 *
 * Unlike lodash's `castArray`, `toArray(undefined)` is `[]`, not `[undefined]`,
 * and holes or nullish items inside an array are removed — the shape a
 * `string | string[] | undefined` query value needs.
 *
 * @example
 * toArray("a") // ["a"]
 * toArray(["a", null, "b"]) // ["a", "b"]
 * toArray(undefined) // []
 * toArray(0) // [0]
 */
export function toArray<T>(value: T | readonly (T | null | undefined)[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }
  const items = (Array.isArray(value) ? value : [value]) as readonly (T | null | undefined)[];
  return items.filter((item): item is T => item != null);
}
