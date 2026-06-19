import { describe, expect, it } from 'vitest';
import { isValidEmail } from './isValidEmail.js';

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('x.y+z@sub.domain.co')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('no-at')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('a@b.')).toBe(false);
  });

  it('rejects missing input', () => {
    expect(isValidEmail()).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
