/**
 * Swap the item at `index` with the one `offset` positions away, returning a
 * new array — what the ↑/↓ buttons of a reorderable list need.
 *
 * When either end falls outside the list the **same array reference** comes
 * back, not a copy, so clicking "up" on the first item doesn't trigger a
 * pointless re-render.
 *
 * @example
 * swapAtIndex(["a", "b", "c"], 1, -1) // ["b", "a", "c"]
 * swapAtIndex(["a", "b", "c"], 1, 1) // ["a", "c", "b"]
 */
export function swapAtIndex<T>(list: T[], index: number, offset: number): T[] {
  const target = index + offset;

  if (index < 0 || target < 0 || index >= list.length || target >= list.length) {
    return list;
  }

  const result = [...list];

  result[index] = list[target] as T;
  result[target] = list[index] as T;

  return result;
}
