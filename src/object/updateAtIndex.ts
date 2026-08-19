/**
 * Return a copy of `list` with only the item at `index` replaced by `updater`'s
 * result — the immutable update a block/field editor needs. An index outside
 * the list leaves every item untouched.
 *
 * @example
 * updateAtIndex([{ n: 1 }, { n: 2 }], 1, (item) => ({ n: item.n * 10 }))
 * // [{ n: 1 }, { n: 20 }]
 */
export function updateAtIndex<T>(list: T[], index: number, updater: (item: T) => T): T[] {
  return list.map((item, currentIndex) => (currentIndex === index ? updater(item) : item));
}
