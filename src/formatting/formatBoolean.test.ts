import { describe, expect, it } from 'vitest';
import { formatBoolean } from './formatBoolean.js';

describe('formatBoolean', () => {
  it('returns Sim for true', () => {
    expect(formatBoolean(true)).toBe('Sim');
  });

  it('returns Não for false and missing input', () => {
    expect(formatBoolean(false)).toBe('Não');
    expect(formatBoolean()).toBe('Não');
    expect(formatBoolean(null)).toBe('Não');
  });
});
