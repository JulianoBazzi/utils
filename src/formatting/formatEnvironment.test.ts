import { describe, expect, it } from 'vitest';
import { formatEnvironment } from './formatEnvironment.js';

describe('formatEnvironment', () => {
  it('returns each known environment', () => {
    expect(formatEnvironment('production')).toBe('production');
    expect(formatEnvironment('homologation')).toBe('homologation');
    expect(formatEnvironment('development')).toBe('development');
    expect(formatEnvironment('test')).toBe('test');
  });

  it('normalizes casing and surrounding whitespace', () => {
    expect(formatEnvironment(' Homologation ')).toBe('homologation');
    expect(formatEnvironment('DEVELOPMENT')).toBe('development');
  });

  it('falls back to production for anything unrecognized', () => {
    expect(formatEnvironment('staging')).toBe('production');
    expect(formatEnvironment('')).toBe('production');
    expect(formatEnvironment('   ')).toBe('production');
    expect(formatEnvironment(null)).toBe('production');
    expect(formatEnvironment(undefined)).toBe('production');
    expect(formatEnvironment()).toBe('production');
  });
});
