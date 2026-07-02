import { describe, expect, it } from 'vitest';
import { isValidRenavam } from './isValidRenavam.js';

describe('isValidRenavam', () => {
  it('accepts a valid 11-digit RENAVAM', () => {
    expect(isValidRenavam('12345678900')).toBe(true);
  });

  it('accepts a legacy 9-digit RENAVAM (padded with zeros)', () => {
    expect(isValidRenavam('345678907')).toBe(true);
    expect(isValidRenavam('00345678907')).toBe(true);
  });

  it('rejects repeated digits', () => {
    expect(isValidRenavam('11111111111')).toBe(false);
  });

  it('rejects a bad check digit', () => {
    expect(isValidRenavam('12345678901')).toBe(false);
  });

  it('rejects a wrong length', () => {
    expect(isValidRenavam('12345678')).toBe(false);
    expect(isValidRenavam('123456789012')).toBe(false);
    expect(isValidRenavam()).toBe(false);
  });
});
