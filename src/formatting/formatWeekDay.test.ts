import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { formatWeekDay } from './formatWeekDay.js';

describe('formatWeekDay', () => {
  it('formats date + capitalized pt-br weekday', () => {
    // 2024-06-15 is a Saturday → "sáb"/"sábado" capitalized.
    const result = formatWeekDay('2024-06-15');
    expect(result).toMatch(/^15\/6 - S/);
  });

  it('does not leak the pt-br locale into the global dayjs', () => {
    formatWeekDay('2024-06-15');
    expect(dayjs().locale()).toBe('en');
  });

  it('returns empty string for missing input', () => {
    expect(formatWeekDay()).toBe('');
    expect(formatWeekDay('')).toBe('');
  });
});
