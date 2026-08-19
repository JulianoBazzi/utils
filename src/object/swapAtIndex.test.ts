import { describe, expect, it } from 'vitest';
import { swapAtIndex } from './swapAtIndex.js';

describe('swapAtIndex', () => {
  it('swaps the item with the previous one', () => {
    expect(swapAtIndex(['a', 'b', 'c'], 1, -1)).toEqual(['b', 'a', 'c']);
  });

  it('swaps the item with the next one', () => {
    expect(swapAtIndex(['a', 'b', 'c'], 1, 1)).toEqual(['a', 'c', 'b']);
  });

  it('returns the same reference when the target is out of bounds', () => {
    const list = ['a', 'b', 'c'];

    expect(swapAtIndex(list, 0, -1)).toBe(list);
    expect(swapAtIndex(list, 2, 1)).toBe(list);
  });

  it('returns the same reference when the source is out of bounds', () => {
    const list = ['a', 'b'];

    expect(swapAtIndex(list, 5, -1)).toBe(list);
    expect(swapAtIndex(list, -1, 1)).toBe(list);
  });

  it('returns the same reference for an empty list', () => {
    const list: string[] = [];

    expect(swapAtIndex(list, 0, 1)).toBe(list);
  });

  it('does not mutate the original list', () => {
    const list = ['a', 'b'];

    swapAtIndex(list, 0, 1);

    expect(list).toEqual(['a', 'b']);
  });
});
