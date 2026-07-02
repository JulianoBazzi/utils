import { describe, expect, it } from 'vitest';
import { formatLongDate } from './formatLongDate.js';

describe('formatLongDate', () => {
  it('formats a date in full Brazilian Portuguese', () => {
    expect(formatLongDate('2026-07-15')).toBe('15 de julho de 2026');
    expect(formatLongDate(new Date(2026, 6, 15))).toBe('15 de julho de 2026');
  });

  it('uses the ordinal for the first day of the month', () => {
    expect(formatLongDate('2026-07-01')).toBe('1º de julho de 2026');
  });

  it('parses YYYY-MM-DD strings as local dates', () => {
    expect(formatLongDate('2026-01-01')).toBe('1º de janeiro de 2026');
    expect(formatLongDate('2026-12-31')).toBe('31 de dezembro de 2026');
  });

  it('applies the optional casing', () => {
    expect(formatLongDate('2026-07-15', { casing: 'uppercase' })).toBe('15 DE JULHO DE 2026');
  });

  it('returns empty string or the fallback for missing/invalid input', () => {
    expect(formatLongDate()).toBe('');
    expect(formatLongDate('not a date', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
