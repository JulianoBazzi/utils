import { describe, expect, it } from 'vitest';
import { findOptionsByIds } from './findOptionsByIds.js';

const options = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
];

describe('findOptionsByIds', () => {
  it('maps each id to its option', () => {
    expect(findOptionsByIds(options, ['1', '2'])).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);
  });

  it('accepts a single string value', () => {
    expect(findOptionsByIds(options, '1')).toEqual([{ id: 1, name: 'A' }]);
  });

  it('drops ids with no match', () => {
    expect(findOptionsByIds(options, ['1', '9'])).toEqual([{ id: 1, name: 'A' }]);
  });

  it('returns an empty array for missing value', () => {
    expect(findOptionsByIds(options)).toEqual([]);
    expect(findOptionsByIds(options, [])).toEqual([]);
  });
});
