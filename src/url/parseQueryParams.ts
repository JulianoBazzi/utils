/**
 * Parse a URL query string into an object. Repeated keys collapse into an
 * array — which `Object.fromEntries(new URLSearchParams(...))` silently drops,
 * keeping only the last value. Accepts the string with or without a leading
 * `"?"`; missing/empty input yields `{}`. Keys that would clash with
 * `Object.prototype` (`__proto__`, `constructor`, `prototype`) are skipped so
 * the result can never have its prototype swapped or inherit a function as a
 * "value".
 *
 * Round-trips with {@link buildQueryParams}.
 *
 * @example
 * parseQueryParams("?page=1&search=abc") // { page: "1", search: "abc" }
 * parseQueryParams("id=1&id=2") // { id: ["1", "2"] }
 * parseQueryParams("") // {}
 */
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function parseQueryParams(value?: string | null): Record<string, string | string[]> {
  if (!value) {
    return {};
  }

  const searchParams = new URLSearchParams(value.startsWith('?') ? value.slice(1) : value);
  const result: Record<string, string | string[]> = {};

  for (const [key, entry] of searchParams) {
    if (FORBIDDEN_KEYS.has(key)) {
      continue;
    }

    // `Object.hasOwn` (not `result[key] === undefined`) so inherited members such
    // as `hasOwnProperty` don't masquerade as an existing value.
    const current = Object.hasOwn(result, key) ? result[key] : undefined;

    if (current === undefined) {
      result[key] = entry;
    } else if (Array.isArray(current)) {
      current.push(entry);
    } else {
      result[key] = [current, entry];
    }
  }

  return result;
}
