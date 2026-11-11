import { describe, expect, it } from 'vitest';
import { isDayOfWeek } from './isDayOfWeek.js';
import { isSunday } from './isSunday.js';

describe('isDayOfWeek', () => {
  it('compares against 0 (Sunday) … 6 (Saturday)', () => {
    expect(isDayOfWeek('2026-07-06', 1)).toBe(true);
    expect(isDayOfWeek('2026-07-06', 2)).toBe(false);
    expect(isDayOfWeek('2026-07-11', 6)).toBe(true);
  });

  it('returns false for missing or invalid input', () => {
    expect(isDayOfWeek(null, 1)).toBe(false);
    expect(isDayOfWeek('2026-02-30', 1)).toBe(false);
  });

  it('reads instants in the given time zone', () => {
    expect(isDayOfWeek('2026-07-06T02:00:00Z', 0, { timeZone: 'America/Sao_Paulo' })).toBe(true);
    expect(isSunday('2026-07-06T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe(true);
  });
});
