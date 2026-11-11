import { readQueryString } from './readQueryString.js';
import type { QuerySource } from './types.js';

/**
 * The value of `key` only when it is one of `allowed` — instead of an
 * unchecked `String(x) as Enum`.
 *
 * Never throws; a missing or invalid value comes back `undefined`, so apply
 * the default with `??`. Accepts any query source: `URLSearchParams`, a query
 * string, Pages Router `query` or App Router `searchParams`.
 *
 * @example
 * readQueryEnum("tab=files", "tab", ["info", "files"] as const) // "files"
 * readQueryEnum("tab=other", "tab", ["info", "files"] as const) // undefined
 */
export function readQueryEnum<T extends string>(
  query: QuerySource,
  key: string,
  allowed: readonly T[],
): T | undefined {
  const value = readQueryString(query, key);
  return value !== undefined && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined;
}
