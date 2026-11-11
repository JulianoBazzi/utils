import { toSearchParams } from './internal/toSearchParams.js';
import type { QuerySource } from './types.js';

/**
 * Every non-empty value of `key`, in order (`[]` when there is none).
 *
 * @example
 * readQueryArray({ tag: ["a", "", "b"] }, "tag") // ["a", "b"]
 * readQueryArray("tag=a&tag=b", "tag") // ["a", "b"]
 */
export function readQueryArray(query: QuerySource, key: string): string[] {
  return toSearchParams(query)
    .getAll(key)
    .filter((value) => value !== '');
}
