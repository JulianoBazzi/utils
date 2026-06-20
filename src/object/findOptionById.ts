/**
 * Find the option whose id matches `value` (the first id when an array is
 * passed). Compares as strings, so `7` matches `"7"`. Returns `null` when no
 * value is given or no option matches.
 *
 * @example
 * findOptionById([{ id: 1, name: "A" }], "1") // { id: 1, name: "A" }
 * findOptionById([{ id: 1, name: "A" }], "9") // null
 */
export function findOptionById<O extends { id?: string | number | null }>(
  options: O[] | undefined | null,
  value?: string | string[] | null,
): O | null {
  const id = Array.isArray(value) ? value[0] : value;
  if (!id) {
    return null;
  }

  return options?.find((option) => String(option.id) === String(id)) ?? null;
}
