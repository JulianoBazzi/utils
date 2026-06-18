/**
 * Return a shallow copy of `obj` without the given `keys`.
 *
 * @example
 * omitFields({ a: 1, b: 2, c: 3 }, ["b"]) // { a: 1, c: 3 }
 */
export function omitFields<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const exclude = new Set<keyof T>(keys);
  const result = {} as Record<keyof T, unknown>;

  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!exclude.has(key)) {
      result[key] = obj[key];
    }
  }

  return result as Omit<T, K>;
}
