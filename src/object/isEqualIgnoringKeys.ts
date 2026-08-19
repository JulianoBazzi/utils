import { normalizeForDiff } from './internal/normalizeForDiff.js';

/**
 * Compare two values structurally while ignoring the given keys at any depth —
 * "did anything meaningful change?", skipping volatile fields such as
 * `updated_at`.
 *
 * Comparison is by JSON shape: object key order is irrelevant, but array order
 * is significant. Unlike a deep-equality helper, `Date` compares by its ISO
 * string and `undefined` properties are ignored.
 *
 * @example
 * isEqualIgnoringKeys({ id: 1, updated_at: "a" }, { id: 1, updated_at: "b" }, ["updated_at"]) // true
 * isEqualIgnoringKeys({ a: 1, b: 2 }, { b: 2, a: 1 }, []) // true
 * isEqualIgnoringKeys(["a", "b"], ["b", "a"], []) // false
 */
export function isEqualIgnoringKeys(a: unknown, b: unknown, keys: Iterable<string>): boolean {
  const ignored = new Set(keys);

  return (
    JSON.stringify(normalizeForDiff(a, ignored)) === JSON.stringify(normalizeForDiff(b, ignored))
  );
}
