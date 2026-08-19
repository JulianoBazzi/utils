import { parseJson } from '../parse/parseJson.js';

/**
 * Check whether a string is parseable JSON.
 * Returns `false` for missing input or parse errors.
 *
 * When you need the parsed value too, call `parseJson` directly instead of
 * pairing the two — this helper already parses the text.
 *
 * @example
 * isValidJson('{"a":1}') // true
 * isValidJson("not json") // false
 */
export function isValidJson(value?: string | null): boolean {
  return parseJson(value) !== undefined;
}
