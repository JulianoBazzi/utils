import { describe, expect, it } from 'vitest';
import { formatDate } from './formatDate.js';

describe('formatDate', () => {
  it('formats as DD/MM/YY by default', () => {
    expect(formatDate('2024-01-02')).toBe('02/01/24');
  });

  it('formats as DD/MM/YYYY when not simplified', () => {
    expect(formatDate('2024-01-02', { simplified: false })).toBe('02/01/2024');
  });

  it('returns the fallback for missing input', () => {
    expect(formatDate()).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('returns the fallback for an invalid date', () => {
    expect(formatDate('not-a-date')).toBe('');
    expect(formatDate('not-a-date', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatDate — 1.3 additions', () => {
  it('returns the fallback for impossible dates instead of rolling over', () => {
    expect(formatDate('2024-02-30', { fallback: '-' })).toBe('-');
    expect(formatDate('2024-13-45')).toBe('');
  });

  it('controls the year with `year`, which wins over `simplified`', () => {
    expect(formatDate('2024-01-02', { year: 'numeric' })).toBe('02/01/2024');
    expect(formatDate('2024-01-02', { year: '2-digit', simplified: false })).toBe('02/01/24');
    expect(formatDate('2024-01-02', { year: false })).toBe('02/01');
  });

  it('accepts Date, Dayjs and epoch numbers', () => {
    expect(formatDate(new Date(2024, 0, 2))).toBe('02/01/24');
    expect(formatDate(new Date(2024, 0, 2).getTime())).toBe('02/01/24');
  });

  it('reads instants in the given time zone', () => {
    expect(formatDate('2024-01-02T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe('01/01/24');
    expect(formatDate('2024-01-02T02:00:00Z', { timeZone: 'UTC' })).toBe('02/01/24');
  });
});
