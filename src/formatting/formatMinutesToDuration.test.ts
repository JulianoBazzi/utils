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

  it('rounds before splitting into hours and minutes', () => {
    expect(formatMinutesToDuration(119.6)).toBe('2h');
    expect(formatMinutesToDuration(89.4)).toBe('1h e 29 min');
    expect(formatMinutesToDuration(0.333)).toBe('20s');
    expect(formatMinutesToDuration(0.999)).toBe('1 min');
  });

  it('treats negative values as positive', () => {
    expect(formatMinutesToDuration(-5)).toBe('5 min');
    expect(formatMinutesToDuration(-0.5)).toBe('30s');
  });

  it('returns the fallback for missing input', () => {
    expect(formatMinutesToDuration()).toBe('');
    expect(formatMinutesToDuration(null, { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
