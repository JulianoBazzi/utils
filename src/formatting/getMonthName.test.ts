import { describe, expect, it } from 'vitest';
import { getMonthName } from './getMonthName.js';

describe('getMonthName', () => {
  it('returns the capitalized full name', () => {
    expect(getMonthName('2026-07-15')).toBe('Julho');
    expect(getMonthName('2026-01-01')).toBe('Janeiro');
    expect(getMonthName('2026-12-31')).toBe('Dezembro');
  });

  it('accepts a YYYY-MM string and a Date', () => {
    expect(getMonthName('2026-07')).toBe('Julho');
    expect(getMonthName(new Date(2026, 6, 15))).toBe('Julho');
  });

  it('returns the short name', () => {
    expect(getMonthName('2026-07-15', { short: true })).toBe('Jul');
    expect(getMonthName('2026-03-01', { short: true })).toBe('Mar');
  });

  it('applies casing', () => {
    expect(getMonthName('2026-07-15', { casing: 'uppercase' })).toBe('JULHO');
    expect(getMonthName('2026-07-15', { casing: 'lowercase' })).toBe('julho');
    expect(getMonthName('2026-07-15', { casing: 'titlecase' })).toBe('Julho');
    expect(getMonthName('2026-07-15', { short: true, casing: 'lowercase' })).toBe('jul');
  });

  it('falls back for missing and invalid input', () => {
    expect(getMonthName('')).toBe('');
    expect(getMonthName(null)).toBe('');
    expect(getMonthName()).toBe('');
    expect(getMonthName('not-a-date')).toBe('');
    expect(getMonthName(null, { fallback: 'Não Informado' })).toBe('Não Informado');
    expect(getMonthName('not-a-date', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('getMonthName — 1.3 additions', () => {
  it('accepts a time zone and rejects impossible months', () => {
    expect(getMonthName('2026-08-01T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe('Julho');
    expect(getMonthName('2026-13', { fallback: '-' })).toBe('-');
  });
});
