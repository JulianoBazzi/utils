import { describe, expect, it } from 'vitest';
import { normalizeZero, presentNumber } from './presentNumber.js';

describe('presentNumber', () => {
  it('keeps finite numbers, zero included', () => {
    expect(presentNumber(0)).toBe(0);
    expect(presentNumber(-1.5)).toBe(-1.5);
  });

  it('treats null, undefined, NaN and Infinity as absent', () => {
    expect(presentNumber(null)).toBeUndefined();
    expect(presentNumber(undefined)).toBeUndefined();
    expect(presentNumber(Number.NaN)).toBeUndefined();
    expect(presentNumber(Number.POSITIVE_INFINITY)).toBeUndefined();
  });
});

describe('normalizeZero', () => {
  it('turns -0 into 0 and leaves other values alone', () => {
    expect(Object.is(normalizeZero(-0), 0)).toBe(true);
    expect(normalizeZero(-2)).toBe(-2);
  });
});
