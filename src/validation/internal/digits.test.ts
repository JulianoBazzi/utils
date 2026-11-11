import { describe, expect, it } from 'vitest';
import { digitAt, isRepeated } from './digits.js';

describe('digitAt', () => {
  it('maps digits to 0–9 and uppercase letters to 17–42', () => {
    expect(digitAt('09', 1)).toBe(9);
    expect(digitAt('A', 0)).toBe(17);
  });
});

describe('isRepeated', () => {
  it('detects a single repeated character', () => {
    expect(isRepeated('11111111111')).toBe(true);
    expect(isRepeated('AAAA')).toBe(true);
    expect(isRepeated('12')).toBe(false);
  });
});
