import { toSearchParams } from './internal/toSearchParams.js';
import type { QuerySource } from './types.js';

/**
 * First non-empty value of `key` — instead of `String(query.search)`, which
 * turns repeated keys into `"a,b"`.
 *
 * Never throws; a missing or invalid value comes back `undefined`, so apply
 * the default with `??`. Accepts any query source: `URLSearchParams`, a query
 * string, Pages Router `query` or App Router `searchParams`.
 *
 * @example
 * readQueryString("search=a&search=b", "search") // "a"
 * readQueryString("search=", "search") // undefined
 */
export function readQueryString(query: QuerySource, key: string): string | undefined {
  return toSearchParams(query)
    .getAll(key)
    .find((value) => value !== '');
}
