import { describe, expect, it } from 'vitest';
import { formatHour } from './formatHour.js';
import { formatTime } from './formatTime.js';

describe('formatTime', () => {
  it('formats the time of a date', () => {
    expect(formatTime('2024-01-02T13:45:30')).toBe('13:45');
    expect(formatTime('2024-01-02T13:45:30', { seconds: true })).toBe('13:45:30');
    expect(formatTime('2024-01-02T13:45:30', { simplified: false })).toBe('13:45:30');
  });

  it('accepts a bare time, with or without seconds', () => {
    expect(formatTime('13:45')).toBe('13:45');
    expect(formatTime('13:45:00')).toBe('13:45');
    expect(formatTime('13:45:09', { seconds: true })).toBe('13:45:09');
  });

  it('returns the fallback for missing or invalid input', () => {
    expect(formatTime(null, { fallback: '-' })).toBe('-');
    expect(formatTime('25:00', { fallback: '-' })).toBe('-');
    expect(formatTime('abc')).toBe('');
  });

  it('reads instants in the given time zone', () => {
    expect(formatTime('2024-01-02T02:00:00Z', { timeZone: 'America/Sao_Paulo' })).toBe('23:00');
  });

  it('keeps formatHour as an alias', () => {
    expect(formatHour).toBe(formatTime);
    expect(formatHour('13:45:00')).toBe('13:45');
  });
});
