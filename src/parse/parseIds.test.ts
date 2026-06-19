import { describe, expect, it } from 'vitest';
import { parseIds } from './parseIds.js';

describe('parseIds', () => {
  it('parses a comma-separated string', () => {
    expect(parseIds('1,2,3')).toEqual([1, 2, 3]);
  });

  it('merges multiple arguments', () => {
    expect(parseIds('1,2', '3')).toEqual([1, 2, 3]);
  });

  it('drops non-numeric and undefined entries', () => {
    expect(parseIds('1,abc,4', undefined)).toEqual([1, 4]);
  });

  it('returns empty array when given nothing', () => {
    expect(parseIds()).toEqual([]);
  });
});
