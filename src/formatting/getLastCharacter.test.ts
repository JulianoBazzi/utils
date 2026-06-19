import { describe, expect, it } from 'vitest';
import { getLastCharacter } from './getLastCharacter.js';

describe('getLastCharacter', () => {
  it('returns the last character', () => {
    expect(getLastCharacter('hello')).toBe('o');
  });

  it('returns empty string for empty/missing input', () => {
    expect(getLastCharacter('')).toBe('');
    expect(getLastCharacter()).toBe('');
  });
});
