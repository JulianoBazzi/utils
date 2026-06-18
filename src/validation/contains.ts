/**
 * Check whether `value` exists in `items`.
 * Returns `false` when `value` is falsy or `items` is missing.
 *
 * @example
 * contains("a", ["a", "b"]) // true
 * contains(3, [1, 2]) // false
 */
export function contains<T>(value: T, items: T[]): boolean {
  if (!value || !items) return false;
  return items.includes(value);
}
