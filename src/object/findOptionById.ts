import { toArray } from '../parse/toArray.js';

type OptionId = string | number;

/**
 * Find the option whose id matches `value` (the first id when an array is
 * passed). Compares as strings, so `7` matches `"7"`; the id `0` is a valid
 * id. Returns `null` when no value is given or no option matches.
 *
 * @example
 * findOptionById([{ id: 1, name: "A" }], "1") // { id: 1, name: "A" }
 * findOptionById([{ id: 0, name: "Zero" }], 0) // { id: 0, name: "Zero" }
 * findOptionById([{ id: 1, name: "A" }], "9") // null
 */
export function findOptionById<O extends { id?: OptionId | null }>(
  options: readonly O[] | undefined | null,
  value?: OptionId | readonly OptionId[] | null,
): O | null {
  const [id] = toArray<OptionId>(value);
  if (id === undefined || id === '') {
    return null;
  }

  return options?.find((option) => String(option.id) === String(id)) ?? null;
}
