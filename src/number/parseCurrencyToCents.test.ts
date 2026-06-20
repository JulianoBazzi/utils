import { describe, expect, it } from 'vitest';
import { parseCurrencyToCents } from './parseCurrencyToCents.js';

describe('parseCurrencyToCents', () => {
  it('parses a BRL string into cents', () => {
    expect(parseCurrencyToCents('R$ 19,90')).toBe(1990);
  });

  it('handles thousands separators', () => {
    expect(parseCurrencyToCents('R$ 1.234,56')).toBe(123456);
  });

  it('handles negative values', () => {
    expect(parseCurrencyToCents('-R$ 5,00')).toBe(-500);
  });

  it('returns 0 for empty/invalid input', () => {
    expect(parseCurrencyToCents('')).toBe(0);
    expect(parseCurrencyToCents('abc')).toBe(0);
    expect(parseCurrencyToCents()).toBe(0);
  });
});
