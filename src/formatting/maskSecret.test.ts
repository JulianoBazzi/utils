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

  it('never leaks the value when a visible side is zero or negative', () => {
    const secret = 'supersecretvalue1234';
    expect(maskSecret(secret, { visibleStart: 2, visibleEnd: 0, mask: '***' })).toBe('su***');
    expect(maskSecret(secret, { visibleStart: 0, visibleEnd: 2, mask: '***' })).toBe('***34');
    expect(maskSecret(secret, { visibleStart: 0, visibleEnd: 0, mask: '***' })).toBe('***');
    expect(maskSecret(secret, { visibleStart: -3, visibleEnd: -2, mask: '***' })).toBe('***');
    expect(maskSecret(secret, { visibleStart: 2.9, visibleEnd: Number.NaN, mask: '***' })).toBe(
      'su***',
    );
  });

  it('returns an empty string for missing input', () => {
    expect(maskSecret()).toBe('');
    expect(maskSecret(null)).toBe('');
    expect(maskSecret('')).toBe('');
  });
});
