import { describe, expect, it } from 'vitest';
import { sanitizeNumeric } from './sanitizeNumeric.js';

// ★ contract shared with nextjs-utils (allowNumericKeyDown pair).
describe('sanitizeNumeric', () => {
  it('★ keeps digits only by default', () => {
    expect(sanitizeNumeric('a1b2')).toBe('12');
  });

  it('★ keeps only the first decimal separator', () => {
    expect(sanitizeNumeric('1.2,3', { allowDecimal: true })).toBe('1.23');
    expect(sanitizeNumeric('1,5', { allowDecimal: true })).toBe('1,5');
  });

  it('★ keeps a single leading minus', () => {
    expect(sanitizeNumeric('12-3', { allowNegative: true })).toBe('123');
    expect(sanitizeNumeric('-1-2', { allowNegative: true })).toBe('-12');
    expect(sanitizeNumeric('-1', {})).toBe('1');
  });

  it('returns "" for missing input', () => {
    expect(sanitizeNumeric(null)).toBe('');
  });
});
