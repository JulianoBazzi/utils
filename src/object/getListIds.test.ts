import { describe, expect, it } from 'vitest';
import { getListIds } from './getListIds.js';

describe('getListIds', () => {
  it('maps numeric ids', () => {
    expect(getListIds([{ id: 1 }, { id: 2 }])).toEqual([1, 2]);
  });

  it('maps string ids', () => {
    expect(getListIds([{ id: 'a' }, { id: 'b' }])).toEqual(['a', 'b']);
  });

  it('skips items without an id', () => {
    expect(getListIds([{ id: 1 }, {}, { id: 3 }])).toEqual([1, 3]);
  });

  it('returns undefined for empty/missing list', () => {
    expect(getListIds([])).toBeUndefined();
    expect(getListIds()).toBeUndefined();
  });
});
