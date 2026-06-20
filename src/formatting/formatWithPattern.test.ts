import { describe, expect, it } from 'vitest';
import { formatWithPattern } from './formatWithPattern.js';

describe('formatWithPattern', () => {
  it('applies a numeric mask', () => {
    expect(formatWithPattern('12345678900', '###.###.###-##')).toBe('123.456.789-00');
  });

  it('is character-agnostic (alphanumeric CNPJ)', () => {
    expect(formatWithPattern('12ABC34501DE35', '##.###.###/####-##')).toBe('12.ABC.345/01DE-35');
  });

  it('stops when the value runs out', () => {
    expect(formatWithPattern('123', '###.###')).toBe('123');
  });

  it('ignores extra value characters', () => {
    expect(formatWithPattern('123456', '##-##')).toBe('12-34');
  });

  it('returns empty string when value or pattern is missing', () => {
    expect(formatWithPattern()).toBe('');
    expect(formatWithPattern('123')).toBe('');
    expect(formatWithPattern('', '###')).toBe('');
    expect(formatWithPattern('123', '')).toBe('');
  });
});
