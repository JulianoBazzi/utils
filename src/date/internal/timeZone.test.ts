import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatDate } from '../../formatting/formatDate.js';
import { formatDateTime } from '../../formatting/formatDateTime.js';
import { getToday } from '../getToday.js';
import { fromWallClock, getZoneFormatter, nowIn, readTimeZone, toWallClock } from './timeZone.js';

const INSTANT = Date.UTC(2024, 0, 2, 2, 30, 15, 250); // 2024-01-02T02:30:15.250Z

// The library is typed for the DOM, not Node; reach `process.env` structurally.
const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } })
  .process.env;

describe('timeZone internals', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reads the wall clock of an instant in a zone', () => {
    expect(toWallClock(INSTANT, 'America/Sao_Paulo')).toEqual({
      year: 2024,
      month: 1,
      day: 1,
      hour: 23,
      minute: 30,
      second: 15,
      millisecond: 250,
    });
    expect(toWallClock(INSTANT, 'Asia/Tokyo')).toMatchObject({ day: 2, hour: 11 });
    expect(toWallClock(-1, 'UTC')).toMatchObject({ year: 1969, millisecond: 999 });
  });

  it('caches formatters and rejects invalid zones', () => {
    expect(getZoneFormatter('UTC')).toBe(getZoneFormatter('UTC'));
    expect(() => getZoneFormatter('Mars/Olympus')).toThrow(/Invalid time zone: "Mars\/Olympus"/);
  });

  it('rebuilds years below 100 without remapping them to 19xx', () => {
    const date = fromWallClock({
      year: 50,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    expect(date.year()).toBe(50);
  });

  it('reads "now" in a zone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(INSTANT);
    expect(nowIn('UTC').format('YYYY-MM-DD HH:mm')).toBe('2024-01-02 02:30');
    expect(nowIn().valueOf()).toBe(INSTANT);
  });

  it('reads timeZone only from option objects', () => {
    expect(readTimeZone({ timeZone: 'UTC' })).toBe('UTC');
    expect(readTimeZone({ timeZone: '' })).toBeUndefined();
    expect(readTimeZone(3)).toBeUndefined();
    expect(readTimeZone(null)).toBeUndefined();
  });

  it.each(['UTC', 'Asia/Tokyo', 'America/Sao_Paulo', 'America/New_York', 'Pacific/Kiritimati'])(
    'gives the same answer when the machine runs in %s',
    (machineZone) => {
      const previous = env.TZ;
      env.TZ = machineZone;
      try {
        vi.useFakeTimers();
        vi.setSystemTime(INSTANT);
        expect(getToday({ timeZone: 'America/Sao_Paulo' })).toBe('2024-01-01');
        expect(getToday({ timeZone: 'UTC' })).toBe('2024-01-02');
        expect(formatDate('2024-01-02T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe(
          '01/01/24',
        );
        expect(formatDateTime(INSTANT, { timeZone: 'Asia/Tokyo' })).toBe('02/01/24 11:30');
        // Naive strings are wall-clock values: never shifted.
        expect(formatDateTime('2024-01-02 02:30', { timeZone: 'Asia/Tokyo' })).toBe(
          '02/01/24 02:30',
        );
      } finally {
        env.TZ = previous;
      }
    },
  );
});
