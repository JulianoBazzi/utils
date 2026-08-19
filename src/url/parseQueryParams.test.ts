import { describe, expect, it } from 'vitest';
import { buildQueryParams } from './buildQueryParams.js';
import { parseQueryParams } from './parseQueryParams.js';

describe('parseQueryParams', () => {
  it('parses a query string with or without the leading "?"', () => {
    expect(parseQueryParams('?page=1&search=abc')).toEqual({ page: '1', search: 'abc' });
    expect(parseQueryParams('page=1&search=abc')).toEqual({ page: '1', search: 'abc' });
  });

  it('collapses repeated keys into an array', () => {
    expect(parseQueryParams('id=1&id=2')).toEqual({ id: ['1', '2'] });
    expect(parseQueryParams('id=1&page=2&id=3')).toEqual({ id: ['1', '3'], page: '2' });
  });

  it('accumulates three or more occurrences of the same key', () => {
    expect(parseQueryParams('id=1&id=2&id=3')).toEqual({ id: ['1', '2', '3'] });
  });

  it('decodes special characters', () => {
    expect(parseQueryParams('?search=a+b%26c')).toEqual({ search: 'a b&c' });
  });

  it('keeps keys with an empty value', () => {
    expect(parseQueryParams('?search=')).toEqual({ search: '' });
  });

  it('returns an empty object for empty and missing input', () => {
    expect(parseQueryParams('')).toEqual({});
    expect(parseQueryParams('?')).toEqual({});
    expect(parseQueryParams(null)).toEqual({});
    expect(parseQueryParams(undefined)).toEqual({});
    expect(parseQueryParams()).toEqual({});
  });

  it('does not confuse inherited Object.prototype members with existing keys', () => {
    expect(parseQueryParams('hasOwnProperty=x&toString=y')).toEqual({
      hasOwnProperty: 'x',
      toString: 'y',
    });
  });

  it('skips prototype-polluting keys', () => {
    const result = parseQueryParams('__proto__=a&__proto__=b&constructor=1&prototype=2&ok=3');

    expect(result).toEqual({ ok: '3' });
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(false);
  });

  it('round-trips with buildQueryParams', () => {
    const params = { page: 1, id: [2, 3], search: 'a b' };

    expect(parseQueryParams(buildQueryParams(params))).toEqual({
      page: '1',
      id: ['2', '3'],
      search: 'a b',
    });
  });
});
