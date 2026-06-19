import { describe, expect, it } from 'vitest';
import { isValidUF } from './isValidUF.js';

describe('isValidUF', () => {
  it('accepts valid UF codes (case-insensitive)', () => {
    expect(isValidUF('SP')).toBe(true);
    expect(isValidUF('sp')).toBe(true);
    expect(isValidUF('RJ')).toBe(true);
  });

  it('rejects invalid codes', () => {
    expect(isValidUF('XX')).toBe(false);
    expect(isValidUF('S')).toBe(false);
    expect(isValidUF('SPP')).toBe(false);
  });

  it('rejects missing input', () => {
    expect(isValidUF()).toBe(false);
    expect(isValidUF('')).toBe(false);
  });
});
