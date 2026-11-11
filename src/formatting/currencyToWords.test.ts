import { describe, expect, it } from 'vitest';
import { currencyToWords } from './currencyToWords.js';

describe('currencyToWords', () => {
  it('spells amounts stored as cents (mirrors formatCurrency)', () => {
    expect(currencyToWords(123456)).toBe(
      'mil duzentos e trinta e quatro reais e cinquenta e seis centavos',
    );
    expect(currencyToWords(1990)).toBe('dezenove reais e noventa centavos');
  });

  it('accepts decimal amounts with divisor 1', () => {
    expect(currencyToWords(1234.56, 1)).toBe(
      'mil duzentos e trinta e quatro reais e cinquenta e seis centavos',
    );
  });

  it('uses the singular for one real / one centavo', () => {
    expect(currencyToWords(100)).toBe('um real');
    expect(currencyToWords(1)).toBe('um centavo');
    expect(currencyToWords(101)).toBe('um real e um centavo');
  });

  it('spells cents only when there are no reais', () => {
    expect(currencyToWords(50)).toBe('cinquenta centavos');
  });

  it('uses "de reais" for round millions', () => {
    expect(currencyToWords(100000000)).toBe('um milhão de reais');
    expect(currencyToWords(200000000000)).toBe('dois bilhões de reais');
    expect(currencyToWords(100000)).toBe('mil reais');
  });

  it('spells zero and negatives', () => {
    expect(currencyToWords(0)).toBe('zero reais');
    expect(currencyToWords(-1990)).toBe('menos dezenove reais e noventa centavos');
  });

  it('returns the fallback for missing/invalid input', () => {
    expect(currencyToWords()).toBe('');
    expect(currencyToWords(null, 100, { fallback: '—' })).toBe('—');
  });

  it('returns the fallback when the amount exceeds numberToWords range', () => {
    expect(currencyToWords(1e17)).toBe('');
    expect(currencyToWords(1e17, 100, { fallback: '—' })).toBe('—');
  });
});

describe('currencyToWords — 1.3 additions', () => {
  it('accepts an options object', () => {
    expect(currencyToWords(1234.56, { divisor: 1 })).toBe(
      'mil duzentos e trinta e quatro reais e cinquenta e seis centavos',
    );
    expect(currencyToWords(null, { fallback: '-' })).toBe('-');
  });

  it('rounds cents exactly', () => {
    expect(currencyToWords(1.005, 1)).toBe('um real e um centavo');
  });

  it('returns the fallback for a zero divisor', () => {
    expect(currencyToWords(100, { divisor: 0, fallback: '-' })).toBe('-');
  });
});
