import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCurrentMonth } from './getCurrentMonth.js';
import { getToday } from './getToday.js';

describe('getToday / getCurrentMonth', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reads today in the given zone (UTC server after 21:00 in Brazil)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-01T02:00:00Z'));
    expect(getToday({ timeZone: 'America/Sao_Paulo' })).toBe('2024-01-31');
    expect(getToday({ timeZone: 'UTC' })).toBe('2024-02-01');
    expect(getCurrentMonth({ timeZone: 'America/Sao_Paulo' })).toBe('2024-01');
    expect(getCurrentMonth({ timeZone: 'UTC' })).toBe('2024-02');
  });

  it('defaults to the runtime zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 6, 21, 12));
    expect(getToday()).toBe('2024-07-21');
    expect(getCurrentMonth()).toBe('2024-07');
  });
});
