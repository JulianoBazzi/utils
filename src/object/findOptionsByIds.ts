import { toArray } from '../parse/toArray.js';
import { findOptionById } from './findOptionById.js';

/**
 * Map each id in `value` to its option, dropping ids with no match.
 * Returns an empty array when no value is given. Ids may be strings or numbers.
 *
 * @example
 * findOptionsByIds([{ id: 1, name: "A" }, { id: 2, name: "B" }], ["1", "2"])
 * // [{ id: 1, name: "A" }, { id: 2, name: "B" }]
 */
export function findOptionsByIds<O extends { id?: string | number | null }>(
  options: readonly O[] | undefined | null,
  value?: string | number | readonly (string | number)[] | null,
): O[] {
  return toArray<string | number>(value)
    .map((item) => findOptionById(options, item))
    .filter((option): option is O => option !== null);
}
