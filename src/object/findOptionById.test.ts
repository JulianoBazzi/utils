import { describe, expect, it } from 'vitest';
import { findOptionById } from './findOptionById.js';

const options = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
];

describe('findOptionById', () => {
  it('matches a numeric id via its string form', () => {
    expect(findOptionById(options, '1')).toEqual({ id: 1, name: 'A' });
  });

  it('uses the first id when an array is passed', () => {
    expect(findOptionById(options, ['2'])).toEqual({ id: 2, name: 'B' });
  });

  it('returns null when there is no match', () => {
    expect(findOptionById(options, '9')).toBeNull();
  });

  it('returns null for missing value or options', () => {
    expect(findOptionById(options)).toBeNull();
    expect(findOptionById(options, '')).toBeNull();
    expect(findOptionById(undefined, '1')).toBeNull();
  });
});
