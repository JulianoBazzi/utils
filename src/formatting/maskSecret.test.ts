import { describe, expect, it } from 'vitest';
import { maskSecret } from './maskSecret.js';

describe('maskSecret', () => {
  it('keeps the ends visible and masks the middle', () => {
    expect(maskSecret('$2y$10$AbCdEfGhIjKlMnOp')).toBe('$2y$1••••••lMnOp');
  });

  it('returns only the mask when the value is too short', () => {
    expect(maskSecret('short')).toBe('••••••');
    expect(maskSecret('exactlyten', { visibleStart: 5, visibleEnd: 5 })).toBe('••••••');
  });

  it('respects custom visible counts and mask', () => {
    expect(maskSecret('abcdefghijkl', { visibleStart: 2, visibleEnd: 2, mask: '***' })).toBe(
      'ab***kl',
    );
  });

  it('returns an empty string for missing input', () => {
    expect(maskSecret()).toBe('');
    expect(maskSecret(null)).toBe('');
    expect(maskSecret('')).toBe('');
  });
});
