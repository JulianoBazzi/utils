/**
 * Map a list of entity-like objects to their ids, skipping any without one.
 * Returns `undefined` for an empty or missing list.
 *
 * @example
 * getListIds([{ id: 1 }, { id: 2 }]) // [1, 2]
 * getListIds([]) // undefined
 */
export function getListIds<T extends { id?: string | number }>(
  list?: T[],
): Array<string | number> | undefined {
  if (list && list.length > 0) {
    return list
      .map((item) => item.id)
      .filter((id): id is string | number => id !== undefined && id !== null);
  }

  return undefined;
}
