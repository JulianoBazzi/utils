import { describe, expect, it } from 'vitest';
import { formatList } from './formatList.js';

describe('formatList', () => {
  it('joins items as a Portuguese list', () => {
    expect(formatList(['Ana'])).toBe('Ana');
    expect(formatList(['Ana', 'Bia'])).toBe('Ana e Bia');
    expect(formatList(['Ana', 'Bia', 'Caio'])).toBe('Ana, Bia e Caio');
    expect(formatList(['Ana', 'Bia'], { conjunction: 'ou' })).toBe('Ana ou Bia');
  });

  it('skips empty items', () => {
    expect(formatList(['Ana', '', null, ' ', 'Bia'])).toBe('Ana e Bia');
  });

  it('summarizes the rest with limit', () => {
    expect(formatList(['a', 'b', 'c', 'd', 'e'], { limit: 3 })).toBe('a, b, c e mais 2');
    expect(formatList(['a', 'b', 'c'], { limit: 3 })).toBe('a, b e c');
    expect(formatList(['a', 'b', 'c'], { limit: 1, moreLabel: (n) => `outros ${n}` })).toBe(
      'a e outros 2',
    );
    expect(formatList(['a', 'b'], { limit: 0 })).toBe('a e b');
  });

  it('returns the fallback for an empty list', () => {
    expect(formatList([], { fallback: 'Nenhum' })).toBe('Nenhum');
    expect(formatList(null)).toBe('');
  });
});
