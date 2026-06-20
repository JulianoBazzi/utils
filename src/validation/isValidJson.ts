/**
 * Check whether a string is parseable JSON.
 * Returns `false` for missing input or parse errors.
 *
 * @example
 * isValidJson('{"a":1}') // true
 * isValidJson("not json") // false
 */
export function isValidJson(value?: string | null): boolean {
  if (!value) return false;

  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
