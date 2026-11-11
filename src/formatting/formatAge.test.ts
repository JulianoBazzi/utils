import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatAge } from './formatAge.js';

describe('formatAge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 1)); // July 1st, 2026
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats the age in plural form', () => {
    expect(formatAge('1990-01-15')).toBe('36 anos');
  });

  it('formats the age in singular form', () => {
    expect(formatAge('2025-01-15')).toBe('1 ano');
  });

  it('formats a newborn as "0 anos"', () => {
    expect(formatAge('2026-06-15')).toBe('0 anos');
  });

  it('returns the fallback for missing input', () => {
    expect(formatAge()).toBe('');
    expect(formatAge(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('falls back to "0 anos" for invalid/future input', () => {
    expect(formatAge('not a date')).toBe('0 anos');
    expect(formatAge('2030-01-01')).toBe('0 anos');
  });
});

describe('formatAge — 1.3 additions', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('forwards the time zone to getAge', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-01T02:00:00Z'));
    expect(formatAge('1990-07-01', { timeZone: 'America/Sao_Paulo' })).toBe('35 anos');
  });

  it('returns the fallback for an empty string', () => {
    expect(formatAge('', { fallback: '-' })).toBe('-');
  });
});
