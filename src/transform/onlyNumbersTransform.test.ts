import { describe, expect, it } from 'vitest';
import { onlyNumbersTransform } from './onlyNumbersTransform.js';

describe('onlyNumbersTransform', () => {
  it('keeps only digits from the original value', () => {
    expect(onlyNumbersTransform(undefined, '(11) 98765-4321')).toBe('11987654321');
  });

  it('ignores the first (parsed) argument', () => {
    expect(onlyNumbersTransform('whatever', '12.345')).toBe('12345');
  });

  it('returns empty string for missing original value', () => {
    expect(onlyNumbersTransform(undefined, undefined)).toBe('');
    expect(onlyNumbersTransform(undefined, null)).toBe('');
  });
});
