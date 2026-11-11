/**
 * Check whether `value` exists in `items`. Falsy members (`0`, `""`, `false`)
 * are matched normally. Returns `false` when `items` is missing. Accepts
 * readonly arrays (e.g. `as const` lists).
 *
 * @example
 * contains("a", ["a", "b"]) // true
 * contains(0, [0, 1]) // true
 * contains(3, [1, 2]) // false
 * contains("x", null) // false
 */
export function contains<T>(value: T, items?: readonly T[] | null): boolean {
  if (!items) return false;
  return items.includes(value);
}
