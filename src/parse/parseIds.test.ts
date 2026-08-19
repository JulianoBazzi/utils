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

  it('drops empty and whitespace-only entries instead of turning them into 0', () => {
    expect(parseIds('1,,2')).toEqual([1, 2]);
    expect(parseIds(' ')).toEqual([]);
    expect(parseIds('1, 2 ,3')).toEqual([1, 2, 3]);
  });

  it('accepts only plain base-10 integers', () => {
    expect(parseIds('0x10,1e3,Infinity,1.5,-7,0')).toEqual([-7, 0]);
    expect(parseIds('99999999999999999999')).toEqual([]);
  });

  it('returns empty array when given nothing', () => {
    expect(parseIds()).toEqual([]);
  });
});
