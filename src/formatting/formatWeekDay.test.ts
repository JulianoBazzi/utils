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

  it('returns the fallback for missing input', () => {
    expect(formatWeekDay('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('supports a custom date format', () => {
    expect(formatWeekDay('2024-06-15', { dateFormat: 'DD/MM/YY' })).toMatch(/^15\/06\/24 - S/);
  });

  it('applies casing', () => {
    expect(formatWeekDay('2024-06-15', { casing: 'uppercase' })).toMatch(/^15\/6 - S\S*$/);
    expect(formatWeekDay('2024-06-15', { casing: 'uppercase' })).toBe(
      formatWeekDay('2024-06-15').toUpperCase(),
    );
    expect(formatWeekDay('2024-06-15', { casing: 'lowercase' })).toBe(
      formatWeekDay('2024-06-15').toLowerCase(),
    );
  });
});
