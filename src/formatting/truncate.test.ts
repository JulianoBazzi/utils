import { describe, expect, it } from 'vitest';
import { truncate } from './truncate.js';

describe('truncate', () => {
  it('appends ellipsis when longer than length', () => {
    expect(truncate('a long sentence', 6)).toBe('a long...');
  });

  it('leaves text at or under length untouched', () => {
    expect(truncate('short', 10)).toBe('short');
    expect(truncate('exactly10!', 10)).toBe('exactly10!');
  });

  it('returns empty string for missing input', () => {
    expect(truncate()).toBe('');
    expect(truncate(null)).toBe('');
  });
});

describe('truncate — 1.3 additions', () => {
  it('accepts an options object with a custom suffix', () => {
    expect(truncate('a long sentence', { length: 6, suffix: '…' })).toBe('a long…');
    expect(truncate('a long sentence', { length: 6 })).toBe('a long...');
  });

  it('never splits an emoji', () => {
    expect(truncate('ab😀cd', 3)).toBe('ab😀...');
  });

  it('returns "" for length <= 0', () => {
    expect(truncate('abc', 0)).toBe('');
  });

  it('defaults to 40 characters', () => {
    expect(truncate('x'.repeat(41))).toBe(`${'x'.repeat(40)}...`);
  });
});
