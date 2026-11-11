import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency.js';

// Node's Intl inserts a non-breaking space (U+00A0) after "R$"; collapse all
// whitespace to a regular space so assertions stay readable. (\s matches NBSP.)
const normalize = (value: string) => value.replace(/\s/g, ' ');

describe('formatCurrency', () => {
  it('divides by 100 by default (cents)', () => {
    expect(normalize(formatCurrency(1990))).toBe('R$ 19,90');
  });

  it('respects a custom divisor', () => {
    expect(normalize(formatCurrency(19.9, 1))).toBe('R$ 19,90');
  });

  it('returns R$ 0,00 for zero/missing input', () => {
    expect(normalize(formatCurrency())).toBe('R$ 0,00');
    expect(normalize(formatCurrency(0))).toBe('R$ 0,00');
  });

  it('uses a custom fallback for missing input only — zero is formatted', () => {
    expect(formatCurrency(null, 100, { fallback: '—' })).toBe('—');
    expect(normalize(formatCurrency(0, 100, { fallback: '—' }))).toBe('R$ 0,00');
  });
});

describe('formatCurrency — 1.3 additions', () => {
  it('accepts an options object', () => {
    expect(normalize(formatCurrency(19.9, { divisor: 1 }))).toBe('R$ 19,90');
    expect(formatCurrency(undefined, { fallback: '-' })).toBe('-');
  });

  it('uses the same non-breaking space in the default fallback and in values', () => {
    expect(formatCurrency(null)).toBe(formatCurrency(0));
    expect(formatCurrency(0)).toContain('\u00a0');
  });

  it('returns the fallback for non-finite input or a zero divisor', () => {
    expect(formatCurrency(Number.NaN, { fallback: '-' })).toBe('-');
    expect(formatCurrency(100, 0, { fallback: '-' })).toBe('-');
    expect(formatCurrency(100, { divisor: Number.POSITIVE_INFINITY, fallback: '-' })).toBe('-');
  });

  it('never renders a negative zero', () => {
    expect(normalize(formatCurrency(-0.001, { divisor: 1 }))).toBe('R$ 0,00');
  });
});
