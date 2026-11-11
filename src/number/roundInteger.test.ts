import { describe, expect, it } from 'vitest';
import { roundInteger } from './roundInteger.js';

describe('roundInteger', () => {
  it('rounds to the nearest integer', () => {
    expect(roundInteger(1.4)).toBe(1);
    expect(roundInteger(1.6)).toBe(2);
    expect(Object.is(roundInteger(-0.4), 0)).toBe(true);
  });

  it('returns the fallback for missing or non-finite input', () => {
    expect(roundInteger()).toBe(0);
    expect(roundInteger(Number.POSITIVE_INFINITY, { fallback: -1 })).toBe(-1);
    expect(roundInteger(0, { fallback: -1 })).toBe(0);
  });
});
