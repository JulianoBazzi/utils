import { readQueryString } from './readQueryString.js';
import type { QuerySource } from './types.js';

/**
 * `"true"`/`"1"` → `true`, `"false"`/`"0"` → `false`, anything else →
 * `undefined` — unlike `Boolean(value)`, `?showAlert=false` is never truthy.
 *
 * Never throws; a missing or invalid value comes back `undefined`, so apply
 * the default with `??`. Accepts any query source: `URLSearchParams`, a query
 * string, Pages Router `query` or App Router `searchParams`.
 *
 * @example
 * readQueryBoolean("showAlert=false", "showAlert") // false
 * readQueryBoolean("showAlert=yes", "showAlert") // undefined
 */
export function readQueryBoolean(query: QuerySource, key: string): boolean | undefined {
  const value = readQueryString(query, key)?.trim().toLowerCase();
  if (value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  return undefined;
}
