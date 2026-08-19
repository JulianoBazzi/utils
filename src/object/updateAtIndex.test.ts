import { describe, expect, it } from 'vitest';
import { updateAtIndex } from './updateAtIndex.js';

describe('updateAtIndex', () => {
  it('updates only the item at the given index', () => {
    expect(updateAtIndex([{ n: 1 }, { n: 2 }], 1, (item) => ({ n: item.n * 10 }))).toEqual([
      { n: 1 },
      { n: 20 },
    ]);
  });

  it('leaves every item untouched when the index does not exist', () => {
    expect(updateAtIndex(['a', 'b'], 5, () => 'x')).toEqual(['a', 'b']);
    expect(updateAtIndex(['a', 'b'], -1, () => 'x')).toEqual(['a', 'b']);
  });

  it('does not mutate the original list', () => {
    const list = ['a', 'b'];
    const result = updateAtIndex(list, 0, () => 'x');

    expect(list).toEqual(['a', 'b']);
    expect(result).not.toBe(list);
  });

  it('handles an empty list', () => {
    expect(updateAtIndex([], 0, (item) => item)).toEqual([]);
  });
});
