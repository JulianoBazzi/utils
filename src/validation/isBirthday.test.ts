import dayjs from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isBirthday } from './isBirthday.js';

describe('isBirthday', () => {
  it("returns true when the date is today's day/month", () => {
    expect(isBirthday(new Date())).toBe(true);
  });

  it('returns false for a different day', () => {
    expect(isBirthday(dayjs().add(1, 'day').toDate())).toBe(false);
  });

  it('returns false for missing input', () => {
    expect(isBirthday()).toBe(false);
  });
});

describe('isBirthday — 1.3 additions', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('accepts strings and reads today in the given time zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-01T02:00:00Z')); // June 30 in São Paulo
    expect(isBirthday('1990-07-01', { timeZone: 'UTC' })).toBe(true);
    expect(isBirthday('1990-07-01', { timeZone: 'America/Sao_Paulo' })).toBe(false);
  });

  it('celebrates 29 February on 28 February in non-leap years', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 1, 28, 12));
    expect(isBirthday('2000-02-29')).toBe(true);
    vi.setSystemTime(new Date(2028, 1, 28, 12));
    expect(isBirthday('2000-02-29')).toBe(false);
    vi.setSystemTime(new Date(2028, 1, 29, 12));
    expect(isBirthday('2000-02-29')).toBe(true);
  });

  it('returns false for invalid input', () => {
    expect(isBirthday('2000-02-30')).toBe(false);
  });
});
