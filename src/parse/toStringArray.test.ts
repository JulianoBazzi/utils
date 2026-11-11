import { describe, expect, it } from 'vitest';
import { toStringArray } from './toStringArray.js';

describe('toStringArray', () => {
  it('keeps only the string entries', () => {
    expect(toStringArray(['a', 1, null, undefined, {}, 'b'])).toEqual(['a', 'b']);
  });

  it('returns the array unchanged when every entry is a string', () => {
    expect(toStringArray(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('returns an empty array for non-array input', () => {
    expect(toStringArray('a')).toEqual([]);
    expect(toStringArray(undefined)).toEqual([]);
    expect(toStringArray(null)).toEqual([]);
    expect(toStringArray({ 0: 'a' })).toEqual([]);
  });
});

describe('toStringArray — 1.3 additions', () => {
  it('wraps a non-empty string with wrap', () => {
    expect(toStringArray('a', { wrap: true })).toEqual(['a']);
    expect(toStringArray('', { wrap: true })).toEqual([]);
    expect(toStringArray(['a', 1], { wrap: true })).toEqual(['a']);
  });
});
