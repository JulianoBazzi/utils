import { describe, expect, it } from 'vitest';
import { onlyAlphanumericTransform } from './onlyAlphanumericTransform.js';

describe('onlyAlphanumericTransform', () => {
  it('keeps only alphanumerics (uppercased) from the original value', () => {
    expect(onlyAlphanumericTransform(undefined, '12.abc-345')).toBe('12ABC345');
  });

  it('ignores the first (parsed) argument', () => {
    expect(onlyAlphanumericTransform('whatever', '12.ab/34-5')).toBe('12AB345');
  });

  it('returns empty string for missing original value', () => {
    expect(onlyAlphanumericTransform(undefined, undefined)).toBe('');
    expect(onlyAlphanumericTransform(undefined, null)).toBe('');
  });
});
