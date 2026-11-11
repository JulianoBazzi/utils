import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { parseDate } from './parseDate.js';

describe('parseDate', () => {
  it('treats null, undefined and "" as missing, but 0 as the epoch', () => {
    expect(parseDate(null)).toBeNull();
    expect(parseDate(undefined)).toBeNull();
    expect(parseDate('')).toBeNull();
    expect(parseDate(0)?.valueOf()).toBe(0);
  });

  it('rejects impossible calendar dates and times instead of rolling over', () => {
    expect(parseDate('2024-02-30')).toBeNull();
    expect(parseDate('2024-13-45')).toBeNull();
    expect(parseDate('2024-01-02 25:00')).toBeNull();
    expect(parseDate('2024-02-29')?.format('YYYY-MM-DD')).toBe('2024-02-29');
  });

  it('keeps dayjs parsing for other string shapes', () => {
    expect(parseDate('not a date')).toBeNull();
    expect(parseDate('2024/01/02')?.format('YYYY-MM-DD')).toBe('2024-01-02');
  });

  it('accepts a bare time only with timeOnly', () => {
    expect(parseDate('13:45')).toBeNull();
    expect(parseDate('13:45', { timeOnly: true })?.format('HH:mm:ss')).toBe('13:45:00');
    expect(parseDate('9:05:30', { timeOnly: true })?.format('HH:mm:ss')).toBe('09:05:30');
    expect(parseDate('24:00', { timeOnly: true })).toBeNull();
    expect(parseDate('2024-01-02T08:00', { timeOnly: true })?.format('HH:mm')).toBe('08:00');
  });

  it('rejects non-finite numbers and invalid Date/Dayjs', () => {
    expect(parseDate(Number.NaN)).toBeNull();
    expect(parseDate(new Date('x'))).toBeNull();
    expect(parseDate(dayjs('x'))).toBeNull();
  });

  it('accepts Date and Dayjs, with or without a zone', () => {
    const instant = new Date(Date.UTC(2024, 0, 2, 2, 0));
    expect(parseDate(instant)?.valueOf()).toBe(instant.valueOf());
    expect(parseDate(dayjs(instant), { timeZone: 'UTC' })?.format('HH:mm')).toBe('02:00');
    expect(parseDate(instant.valueOf(), { timeZone: 'America/Sao_Paulo' })?.format('HH:mm')).toBe(
      '23:00',
    );
  });

  it('shifts only strings that carry an offset', () => {
    const tz = { timeZone: 'America/Sao_Paulo' };
    expect(parseDate('2024-01-02T02:00:00Z', tz)?.format('YYYY-MM-DD HH:mm')).toBe(
      '2024-01-01 23:00',
    );
    expect(parseDate('2024-01-02T02:00:00.500+03:00', tz)?.format('YYYY-MM-DD HH:mm')).toBe(
      '2024-01-01 20:00',
    );
    expect(parseDate('2024-01-02T02:00Z', tz)?.format('YYYY-MM-DD HH:mm')).toBe('2024-01-01 23:00');
    expect(parseDate('2024-01-02T02:00', tz)?.format('YYYY-MM-DD HH:mm')).toBe('2024-01-02 02:00');
    expect(parseDate('2024-01-02', tz)?.format('YYYY-MM-DD')).toBe('2024-01-02');
  });
});
