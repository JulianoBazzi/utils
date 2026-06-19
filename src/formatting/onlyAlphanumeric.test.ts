import { describe, expect, it } from 'vitest';
import { onlyAlphanumeric } from './onlyAlphanumeric.js';

describe('onlyAlphanumeric', () => {
  it('strips non-alphanumeric and uppercases', () => {
    expect(onlyAlphanumeric('12.abc-345')).toBe('12ABC345');
    expect(onlyAlphanumeric('a@b#c')).toBe('ABC');
  });

  it('returns empty string for missing input', () => {
    expect(onlyAlphanumeric()).toBe('');
    expect(onlyAlphanumeric(null)).toBe('');
    expect(onlyAlphanumeric('')).toBe('');
  });
});
