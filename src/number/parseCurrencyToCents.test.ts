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

describe('parseCurrencyToCents — 1.3 additions', () => {
  it('detects the decimal separator', () => {
    expect(parseCurrencyToCents('1.5')).toBe(150);
    expect(parseCurrencyToCents('1,5')).toBe(150);
    expect(parseCurrencyToCents('1.500')).toBe(150000);
    expect(parseCurrencyToCents('1,234.56')).toBe(123456);
    expect(parseCurrencyToCents('1.234.567')).toBe(123456700);
    expect(parseCurrencyToCents('1,234,567')).toBe(123456700);
    expect(parseCurrencyToCents('R$ 10')).toBe(1000);
  });

  it('rounds cents exactly', () => {
    expect(parseCurrencyToCents('1,005')).toBe(100500);
    expect(parseCurrencyToCents('1,0051')).toBe(101);
  });
});
