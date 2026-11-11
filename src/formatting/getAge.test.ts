import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAge } from './getAge.js';

describe('getAge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 1)); // July 1st, 2026
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the age in full years', () => {
    expect(getAge('1990-01-15')).toBe(36);
    expect(getAge(new Date(1990, 0, 15))).toBe(36);
  });

  it('counts the birthday itself as completed', () => {
    expect(getAge('1990-07-01')).toBe(36);
  });

  it('does not count a birthday that has not arrived yet', () => {
    expect(getAge('1990-07-02')).toBe(35);
    expect(getAge('1990-12-25')).toBe(35);
  });

  it('returns 0 for missing/invalid input and future dates', () => {
    expect(getAge()).toBe(0);
    expect(getAge('not a date')).toBe(0);
    expect(getAge('2030-01-01')).toBe(0);
  });
});

describe('getAge — 1.3 additions', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reads "today" in the given time zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-01T02:00:00Z')); // still June 30 in São Paulo
    expect(getAge('1990-07-01', { timeZone: 'UTC' })).toBe(36);
    expect(getAge('1990-07-01', { timeZone: 'America/Sao_Paulo' })).toBe(35);
  });

  it('can be passed straight to .map (the index is ignored)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 1));
    expect(['1990-07-01', '2000-07-02'].map(getAge)).toEqual([36, 25]);
  });

  it('rejects impossible dates', () => {
    expect(getAge('1990-02-30')).toBe(0);
  });
});
