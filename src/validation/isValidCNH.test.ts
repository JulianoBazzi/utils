import { describe, expect, it } from 'vitest';
import { isValidCNH } from './isValidCNH.js';

describe('isValidCNH', () => {
  it('accepts a valid CNH', () => {
    expect(isValidCNH('12345678900')).toBe(true);
  });

  it('accepts a valid CNH that uses the discount rule', () => {
    // First sum rest is 10 → dv1 = 0 with a discount of 2 on dv2.
    expect(isValidCNH('98765432109')).toBe(true);
  });

  it('rejects repeated digits', () => {
    expect(isValidCNH('11111111111')).toBe(false);
  });

  it('rejects a bad check digit', () => {
    expect(isValidCNH('12345678901')).toBe(false);
    expect(isValidCNH('98765432100')).toBe(false);
  });

  it('rejects a wrong length', () => {
    expect(isValidCNH('123456789')).toBe(false);
    expect(isValidCNH()).toBe(false);
  });
});
