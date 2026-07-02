import { describe, expect, it } from 'vitest';
import { isValidPlate } from './isValidPlate.js';

describe('isValidPlate', () => {
  it('accepts a legacy plate (with and without separator)', () => {
    expect(isValidPlate('ABC1234')).toBe(true);
    expect(isValidPlate('ABC-1234')).toBe(true);
    expect(isValidPlate('abc1234')).toBe(true);
  });

  it('accepts a Mercosul plate', () => {
    expect(isValidPlate('ABC1D23')).toBe(true);
    expect(isValidPlate('abc1d23')).toBe(true);
  });

  it('rejects invalid layouts', () => {
    expect(isValidPlate('AB12345')).toBe(false);
    expect(isValidPlate('ABCD123')).toBe(false);
    expect(isValidPlate('ABC12D3')).toBe(false);
    expect(isValidPlate('ABC123')).toBe(false);
  });

  it('rejects missing input', () => {
    expect(isValidPlate()).toBe(false);
    expect(isValidPlate('')).toBe(false);
    expect(isValidPlate(null)).toBe(false);
  });
});
