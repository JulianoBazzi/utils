import { describe, expect, it } from 'vitest';
import { formatDuration } from './formatDuration.js';

describe('formatDuration', () => {
  it('renders sub-minute values as seconds', () => {
    expect(formatDuration(0.5)).toBe('30s');
  });

  it('renders hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h e 30 min');
  });

  it('renders whole hours', () => {
    expect(formatDuration(120)).toBe('2h');
  });

  it('renders minutes only', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  it('returns empty string for missing input', () => {
    expect(formatDuration()).toBe('');
    expect(formatDuration(0)).toBe('');
  });
});
