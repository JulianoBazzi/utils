import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { formatTimeAgo } from './formatTimeAgo.js';

describe('formatTimeAgo', () => {
  it('formats minutes (plural)', () => {
    expect(formatTimeAgo(dayjs().subtract(5, 'minute').toISOString())).toBe('5 minutos');
  });

  it('formats hours (plural)', () => {
    expect(formatTimeAgo(dayjs().subtract(2, 'hour').toISOString())).toBe('2 horas');
  });

  it('formats days (plural)', () => {
    expect(formatTimeAgo(dayjs().subtract(5, 'day').toISOString())).toBe('5 dias');
  });

  it('uses singular for one day', () => {
    expect(formatTimeAgo(dayjs().subtract(1, 'day').subtract(1, 'hour').toISOString())).toBe(
      '1 dia',
    );
  });

  it('never goes below one unit (zero diff reads as "1 minuto")', () => {
    expect(formatTimeAgo(dayjs().toISOString())).toBe('1 minuto');
  });

  it('uses singular for one hour', () => {
    expect(formatTimeAgo(dayjs().subtract(90, 'minute').toISOString())).toBe('1 hora');
  });

  it('formats months (plural and singular)', () => {
    expect(formatTimeAgo(dayjs().subtract(65, 'day').toISOString())).toBe('2 meses');
    expect(formatTimeAgo(dayjs().subtract(35, 'day').toISOString())).toBe('1 mês');
  });

  it('formats years (plural and singular)', () => {
    expect(formatTimeAgo(dayjs().subtract(800, 'day').toISOString())).toBe('2 anos');
    expect(formatTimeAgo(dayjs().subtract(400, 'day').toISOString())).toBe('1 ano');
  });

  it('returns the fallback for an invalid date', () => {
    expect(formatTimeAgo('not-a-date')).toBe('');
    expect(formatTimeAgo('not-a-date', { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('clamps future dates to the minimum unit', () => {
    expect(formatTimeAgo(dayjs().add(3, 'day').toISOString())).toBe('1 minuto');
  });

  it('returns empty string for missing input', () => {
    expect(formatTimeAgo()).toBe('');
    expect(formatTimeAgo(null)).toBe('');
  });

  it('returns the fallback for missing input', () => {
    expect(formatTimeAgo(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
