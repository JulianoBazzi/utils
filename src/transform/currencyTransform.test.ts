import { describe, expect, it } from 'vitest';
import { currencyTransform } from './currencyTransform.js';

describe('currencyTransform', () => {
  it('turns masked strings and cents into reais', () => {
    expect(currencyTransform(undefined, 'R$ 1.234,56')).toBe(1234.56);
    expect(currencyTransform(undefined, 1990)).toBe(19.9);
  });

  it('returns null for empty input', () => {
    expect(currencyTransform(undefined, '')).toBeNull();
    expect(currencyTransform(undefined, null)).toBeNull();
    expect(currencyTransform(undefined, undefined)).toBeNull();
    expect(currencyTransform(undefined, Number.NaN)).toBeNull();
  });

  it('keeps a leading minus', () => {
    expect(currencyTransform(undefined, '-R$ 5,00')).toBe(-5);
  });

  it('accepts a divisor and ignores a yup schema in the 3rd argument', () => {
    expect(currencyTransform(undefined, '1990', { divisor: 1 })).toBe(1990);
    const schema = { type: 'number' } as unknown as { divisor?: number };
    expect(currencyTransform(undefined, '1990', schema)).toBe(19.9);
  });
});
