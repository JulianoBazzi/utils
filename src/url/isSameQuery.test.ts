import { describe, expect, it } from 'vitest';
import { isSameQuery } from './isSameQuery.js';

describe('isSameQuery', () => {
  describe('★ contrato nextjs-utils', () => {
    it('ignores key order, encoding and a leading "?"', () => {
      expect(isSameQuery('a=1&b=2', 'b=2&a=1')).toBe(true);
      expect(isSameQuery('q=a+b', 'q=a%20b')).toBe(true);
      expect(isSameQuery('?x=1', 'x=1')).toBe(true);
    });

    it('keeps the order of repeated values unless asked not to', () => {
      expect(isSameQuery('id=1&id=2', 'id=2&id=1')).toBe(false);
      expect(isSameQuery('id=1&id=2', 'id=2&id=1', { ignoreValueOrder: true })).toBe(true);
    });

    it('ignores undefined values in objects', () => {
      expect(isSameQuery({ a: '1', b: undefined }, 'a=1')).toBe(true);
    });
  });

  it('accepts URLSearchParams, arrays in objects and missing sources', () => {
    expect(isSameQuery(new URLSearchParams('t=a&t=b'), { t: ['a', 'b'] })).toBe(true);
    expect(isSameQuery(null, undefined)).toBe(true);
    expect(isSameQuery('a=1', 'a=1&b=2')).toBe(false);
    expect(isSameQuery('a=1', 'a=2')).toBe(false);
  });

  it('skips prototype keys in objects', () => {
    expect(isSameQuery(JSON.parse('{"__proto__":"x","a":"1"}'), 'a=1')).toBe(true);
  });
});
