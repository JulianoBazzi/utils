import { describe, expect, it } from 'vitest';
import { appendValue } from './appendValue.js';

describe('appendValue', () => {
  it('joins both values with the default separator', () => {
    expect(appendValue('a', 'b')).toBe('a; b');
  });

  it('returns the present side when the other is missing', () => {
    expect(appendValue('a')).toBe('a');
    expect(appendValue(undefined, 'b')).toBe('b');
  });

  it('trims each side before joining', () => {
    expect(appendValue('  a  ', '  b  ')).toBe('a; b');
    expect(appendValue('   ', 'b')).toBe('b');
  });

  it('returns the fallback when both are empty', () => {
    expect(appendValue()).toBe('');
    expect(appendValue('', '   ')).toBe('');
    expect(appendValue('', '', { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('uses a custom separator', () => {
    expect(appendValue('a', 'b', { separator: ' | ' })).toBe('a | b');
  });

  it('applies casing', () => {
    expect(appendValue('a', 'b', { casing: 'uppercase' })).toBe('A; B');
    expect(appendValue('A', 'B', { casing: 'lowercase' })).toBe('a; b');
    expect(appendValue('são paulo', 'rio', { casing: 'titlecase' })).toBe('São Paulo; Rio');
  });
});
