import type { QueryValue } from './types.js';

export interface BuildQueryUrlOptions {
  /** Keys in `params` to leave untouched. Defaults to none. */
  ignore?: readonly string[];
  /** Keep the `#hash` of `url`. Defaults to `true`. */
  keepHash?: boolean;
}

// The string form of one value, or undefined when it should not be written.
function serialize(value: QueryValue): string | undefined {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }
  return String(value);
}

/**
 * Patch the query string of `url` with `params` — the pure core of an
 * "update query params" hook, usable for `href`s, redirects and tests.
 *
 * - Each key in `params` replaces every occurrence of that key.
 * - `""`, `null`, `undefined`, non-finite numbers, invalid dates and empty
 *   arrays **remove** the key; `false` and `0` are written.
 * - Arrays become repeated keys (empty items skipped); a `Date` becomes ISO.
 * - Keys in `ignore` are left alone; the `#hash` is kept unless `keepHash: false`.
 * - An empty query leaves just the path, without `?`.
 *
 * Unlike {@link buildQueryParams}, which serializes an object from scratch,
 * this merges into the existing query.
 *
 * @example
 * buildQueryUrl("/a?x=1", { y: 2 }) // "/a?x=1&y=2"
 * buildQueryUrl("/a?x=1&x=2", { x: 3 }) // "/a?x=3"
 * buildQueryUrl("/a?x=1", { x: "" }) // "/a"
 * buildQueryUrl("/a?x=1#top", { x: 2 }) // "/a?x=2#top"
 */
export function buildQueryUrl(
  url: string,
  params: Readonly<Record<string, QueryValue>>,
  options: BuildQueryUrlOptions = {},
): string {
  const { ignore = [], keepHash = true } = options;
  const ignored = new Set(ignore);

  // Split at the first "#" and the first "?": both may legally appear again later.
  const hashIndex = url.indexOf('#');
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
  const beforeHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = beforeHash.indexOf('?');
  const path = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const query = new URLSearchParams(queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : '');

  for (const [key, value] of Object.entries(params)) {
    if (ignored.has(key)) {
      continue;
    }
    query.delete(key);
    const items: readonly QueryValue[] = Array.isArray(value) ? value : [value as QueryValue];
    for (const item of items) {
      const serialized = serialize(item);
      if (serialized !== undefined) {
        query.append(key, serialized);
      }
    }
  }

  const queryString = query.toString();
  return `${path}${queryString ? `?${queryString}` : ''}${keepHash ? hash : ''}`;
}
