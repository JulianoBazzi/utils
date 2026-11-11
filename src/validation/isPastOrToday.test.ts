import { afterEach, describe, expect, it, vi } from 'vitest';
import { isPastOrToday } from './isPastOrToday.js';

describe('isPastOrToday', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('compares calendar days against the reference', () => {
    expect(isPastOrToday('2026-07-21', { reference: '2026-07-21' })).toBe(true);
    expect(isPastOrToday('2026-07-20T23:59', { reference: '2026-07-21' })).toBe(true);
    expect(isPastOrToday('2026-07-22', { reference: '2026-07-21' })).toBe(false);
  });

  it('defaults to today in the given time zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-22T02:00:00Z')); // July 21 in São Paulo
    expect(isPastOrToday('2026-07-22', { timeZone: 'UTC' })).toBe(true);
    expect(isPastOrToday('2026-07-22', { timeZone: 'America/Sao_Paulo' })).toBe(false);
    expect(isPastOrToday('2026-07-21')).toBe(true);
  });

  it('returns false for missing or invalid input', () => {
    expect(isPastOrToday(null)).toBe(false);
    expect(isPastOrToday('2026-02-30')).toBe(false);
    expect(isPastOrToday('2026-01-01', { reference: 'nope' })).toBe(false);
  });
});
