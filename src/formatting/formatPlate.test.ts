import { describe, expect, it } from 'vitest';
import { formatPlate } from './formatPlate.js';

describe('formatPlate', () => {
  it('formats a legacy plate as AAA-9999', () => {
    expect(formatPlate('abc1234')).toBe('ABC-1234');
    expect(formatPlate('ABC-1234')).toBe('ABC-1234');
  });

  it('keeps the Mercosul layout without separator', () => {
    expect(formatPlate('abc1d23')).toBe('ABC1D23');
  });

  it('returns other values cleaned and uppercased', () => {
    expect(formatPlate('ab-12')).toBe('AB12');
  });

  it('returns empty string or the fallback for missing input', () => {
    expect(formatPlate()).toBe('');
    expect(formatPlate('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
