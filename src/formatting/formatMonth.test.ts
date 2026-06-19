import { describe, expect, it } from 'vitest';
import { formatMonth } from './formatMonth.js';

describe('formatMonth', () => {
  it('formats as MM/YYYY', () => {
    expect(formatMonth('2024-01-02')).toBe('01/2024');
  });

  it('returns empty string for missing input', () => {
    expect(formatMonth()).toBe('');
    expect(formatMonth(null)).toBe('');
    expect(formatMonth('')).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatMonth(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
