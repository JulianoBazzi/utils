/**
 * Parse a JSON string, returning `undefined` instead of throwing when it is
 * missing or malformed. Use it in place of `isValidJson` followed by
 * `JSON.parse`, which parses the same text twice.
 *
 * Valid JSON can legitimately produce `null` (from `"null"`), which stays
 * distinct from the `undefined` returned on failure.
 *
 * @example
 * parseJson<{ a: number }>('{"a":1}') // { a: 1 }
 * parseJson("not json") // undefined
 * parseJson("null") // null
 */
export function parseJson<T = unknown>(value?: string | null): T | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}
