import type { DateString } from '../date/types.js';
import { isValidDateString } from '../validation/isValidDateString.js';
import { readQueryString } from './readQueryString.js';
import type { QuerySource } from './types.js';

/**
 * A `YYYY-MM-DD` value that is a real calendar date (`"2026-02-30"` →
 * `undefined`), safe to send to an API.
 *
 * Never throws; a missing or invalid value comes back `undefined`, so apply
 * the default with `??`. Accepts any query source: `URLSearchParams`, a query
 * string, Pages Router `query` or App Router `searchParams`.
 *
 * @example
 * readQueryDate("start=2026-03-01", "start") // "2026-03-01"
 * readQueryDate("start=2026-02-30", "start") // undefined
 */
export function readQueryDate(query: QuerySource, key: string): DateString | undefined {
  const value = readQueryString(query, key);
  return isValidDateString(value) ? value : undefined;
}
