import { describe, expect, it } from 'vitest';
import { contains } from './contains.js';

describe('contains', () => {
  it('returns true when the value is present', () => {
    expect(contains('a', ['a', 'b'])).toBe(true);
  });

  it('returns false when the value is absent', () => {
    expect(contains(3, [1, 2])).toBe(false);
  });

  it('matches falsy members that are present', () => {
    expect(contains(0, [0, 1])).toBe(true);
    expect(contains(false, [false])).toBe(true);
    expect(contains('', ['', 'a'])).toBe(true);
  });

  it('returns false when a falsy value is absent', () => {
    expect(contains('', ['a'])).toBe(false);
  });
});
