import { describe, expect, it } from 'vitest';
import { getWeekDayName } from './getWeekDayName.js';

describe('getWeekDayName', () => {
  it('returns the capitalized full name', () => {
    expect(getWeekDayName('2026-07-11')).toBe('Sábado');
    expect(getWeekDayName('2026-07-12')).toBe('Domingo');
    expect(getWeekDayName('2026-07-13')).toBe('Segunda-feira');
  });

  it('accepts a Date', () => {
    expect(getWeekDayName(new Date(2026, 6, 11))).toBe('Sábado');
  });

  it('returns the short name', () => {
    expect(getWeekDayName('2026-07-11', { short: true })).toBe('Sáb');
    expect(getWeekDayName('2026-07-12', { short: true })).toBe('Dom');
  });

  it('applies casing', () => {
    expect(getWeekDayName('2026-07-11', { casing: 'uppercase' })).toBe('SÁBADO');
    expect(getWeekDayName('2026-07-11', { casing: 'lowercase' })).toBe('sábado');
    expect(getWeekDayName('2026-07-11', { casing: 'titlecase' })).toBe('Sábado');
    expect(getWeekDayName('2026-07-11', { short: true, casing: 'lowercase' })).toBe('sáb');
  });

  it('falls back for missing and invalid input', () => {
    expect(getWeekDayName('')).toBe('');
    expect(getWeekDayName(null)).toBe('');
    expect(getWeekDayName()).toBe('');
    expect(getWeekDayName('not-a-date')).toBe('');
    expect(getWeekDayName(null, { fallback: 'Não Informado' })).toBe('Não Informado');
    expect(getWeekDayName('not-a-date', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
