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

describe('formatWithPattern — 1.3 additions', () => {
  it('fills the remaining slots with a placeholder', () => {
    expect(formatWithPattern('119', '(##) #####-####', { placeholder: '_' })).toBe(
      '(11) 9____-____',
    );
    expect(formatWithPattern('', '##/##', { placeholder: '_' })).toBe('__/__');
    expect(formatWithPattern(null, '##/##', { placeholder: '' })).toBe('/');
  });

  it('accepts a custom token', () => {
    expect(formatWithPattern('1234', '99-99', { token: '9' })).toBe('12-34');
  });

  it('cuts input longer than the pattern', () => {
    expect(formatWithPattern('123456', '##-##')).toBe('12-34');
  });
});
