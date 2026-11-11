import { parseIds } from '../parse/parseIds.js';
import { readQueryArray } from './readQueryArray.js';
import type { QuerySource } from './types.js';

export interface ReadQueryIdsOptions {
  /** Keep at most this many ids. Defaults to all. */
  max?: number;
}

/**
 * Positive integer ids from repeated keys and/or commas (`?id=1,2&id=3`),
 * without duplicates, in order. `0`, negatives, fractions and garbage are
 * dropped (`[]` when nothing is left).
 *
 * @example
 * readQueryIds({ id: ["1,2", "2", "x", "-3"] }, "id") // [1, 2]
 * readQueryIds("id=1,2,3", "id", { max: 2 }) // [1, 2]
 */
export function readQueryIds(
  query: QuerySource,
  key: string,
  options: ReadQueryIdsOptions = {},
): number[] {
  const ids = parseIds(readQueryArray(query, key), { positive: true, unique: true });
  return options.max === undefined ? ids : ids.slice(0, Math.max(options.max, 0));
}
