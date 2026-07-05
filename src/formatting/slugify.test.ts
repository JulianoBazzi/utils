import { describe, expect, it } from 'vitest';
import { slugify } from './slugify.js';

describe('slugify', () => {
  it('removes accents and lowercases', () => {
    expect(slugify('São Paulo')).toBe('sao-paulo');
  });

  it('collapses symbols/spaces into single hyphens and trims edges', () => {
    expect(slugify('  Relatório 2026!  ')).toBe('relatorio-2026');
  });

  it('returns empty string for missing input', () => {
    expect(slugify()).toBe('');
    expect(slugify(null)).toBe('');
    expect(slugify('!!!')).toBe('');
  });
});
