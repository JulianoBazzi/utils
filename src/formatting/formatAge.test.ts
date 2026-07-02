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
