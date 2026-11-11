import { describe, expect, it } from 'vitest';
import {
  daysInMonth,
  isLeapYear,
  isValidCalendarDate,
  isValidIsoParts,
  isValidTime,
  matchIsoDate,
  zoneOffsetMinutes,
} from './calendar.js';

describe('calendar helpers', () => {
  it('knows leap years and month lengths, including years below 100', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(50, 4)).toBe(30);
    expect(daysInMonth(2024, 13)).toBe(0);
  });

  it('validates calendar dates and times', () => {
    expect(isValidCalendarDate(2024, 2, 29)).toBe(true);
    expect(isValidCalendarDate(2024, 2, 30)).toBe(false);
    expect(isValidCalendarDate(2024, 0, 1)).toBe(false);
    expect(isValidTime(23, 59, 59)).toBe(true);
    expect(isValidTime(24, 0)).toBe(false);
    expect(isValidTime(12, 60)).toBe(false);
  });

  it('splits ISO-like strings into parts', () => {
    expect(matchIsoDate('2024-07')).toEqual({
      year: 2024,
      month: 7,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
      millisecond: undefined,
      zone: undefined,
    });
    expect(matchIsoDate('2024-7-5 9:30')).toMatchObject({ month: 7, day: 5, hour: 9, minute: 30 });
    expect(matchIsoDate('2024-01-02T13:45:30.5z')).toMatchObject({
      second: 30,
      millisecond: 500,
      zone: 'Z',
    });
    expect(matchIsoDate('2024-01-02T13:45-0300')).toMatchObject({ zone: '-0300' });
    expect(matchIsoDate('Jul 15 2024')).toBeNull();
    expect(matchIsoDate('2024-01-02 13:45abc')).toBeNull();
  });

  it('checks parts as a whole', () => {
    expect(isValidIsoParts({ year: 2024, month: 2 })).toBe(true);
    expect(isValidIsoParts({ year: 2024, month: 2, day: 30 })).toBe(false);
    expect(isValidIsoParts({ year: 2024, month: 1, day: 2, hour: 25, minute: 0 })).toBe(false);
  });

  it('reads zone offsets in minutes', () => {
    expect(zoneOffsetMinutes('Z')).toBe(0);
    expect(zoneOffsetMinutes('+03:00')).toBe(180);
    expect(zoneOffsetMinutes('-0330')).toBe(-210);
  });
});
