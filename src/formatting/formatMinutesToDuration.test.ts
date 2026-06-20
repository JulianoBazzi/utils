import { describe, expect, it } from 'vitest';
import { formatMinutesToDuration } from './formatMinutesToDuration.js';

describe('formatMinutesToDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatMinutesToDuration(90)).toBe('1h e 30 min');
    expect(formatMinutesToDuration(120)).toBe('2h');
    expect(formatMinutesToDuration(45)).toBe('45 min');
  });

  it('renders sub-minute values as seconds', () => {
    expect(formatMinutesToDuration(0.5)).toBe('30s');
  });

  it('supports the spaced option', () => {
    expect(formatMinutesToDuration(90, { spaced: true })).toBe('1 h e 30 min');
    expect(formatMinutesToDuration(120, { spaced: true })).toBe('2 h');
    expect(formatMinutesToDuration(0.5, { spaced: true })).toBe('30 s');
  });

  it('returns the fallback for missing input', () => {
    expect(formatMinutesToDuration()).toBe('');
    expect(formatMinutesToDuration(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
