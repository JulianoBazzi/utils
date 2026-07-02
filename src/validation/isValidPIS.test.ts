import { describe, expect, it } from 'vitest';
import { isValidPIS } from './isValidPIS.js';

describe('isValidPIS', () => {
  it('accepts a valid PIS (masked and unmasked)', () => {
    expect(isValidPIS('12012345672')).toBe(true);
    expect(isValidPIS('120.12345.67-2')).toBe(true);
    expect(isValidPIS('12345678900')).toBe(true);
  });

  it('rejects repeated digits', () => {
    expect(isValidPIS('11111111111')).toBe(false);
  });

  it('rejects a bad check digit', () => {
    expect(isValidPIS('12012345671')).toBe(false);
  });

  it('rejects a wrong length', () => {
    expect(isValidPIS('123')).toBe(false);
    expect(isValidPIS()).toBe(false);
  });
});
