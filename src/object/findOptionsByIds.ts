import { findOptionById } from './findOptionById.js';

/**
 * Map each id in `value` to its option, dropping ids with no match.
 * Returns an empty array when no value is given.
 *
 * @example
 * findOptionsByIds([{ id: 1, name: "A" }, { id: 2, name: "B" }], ["1", "2"])
 * // [{ id: 1, name: "A" }, { id: 2, name: "B" }]
 */
export function findOptionsByIds<O extends { id?: string | number | null }>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
): O[] {
  const values = value ? (Array.isArray(value) ? value : [value]) : [];

  return values
    .map((item) => findOptionById(options, item))
    .filter((option): option is O => option !== null);
}
