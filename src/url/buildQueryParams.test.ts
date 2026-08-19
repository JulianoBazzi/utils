import { describe, expect, it } from 'vitest';
import { buildQueryParams } from './buildQueryParams.js';

describe('buildQueryParams', () => {
  it('serializes a flat object', () => {
    expect(buildQueryParams({ page: 1, search: 'abc' })).toBe('?page=1&search=abc');
  });

  it('expands arrays into repeated keys', () => {
    expect(buildQueryParams({ id: [1, 2] })).toBe('?id=1&id=2');
    expect(buildQueryParams({ id: [] })).toBe('');
  });

  it('skips null and undefined values, including inside arrays', () => {
    expect(buildQueryParams({ page: 1, search: null, order: undefined })).toBe('?page=1');
    expect(buildQueryParams({ id: [1, null, 2, undefined] })).toBe('?id=1&id=2');
  });

  it('keeps falsy-but-meaningful values', () => {
    expect(buildQueryParams({ page: 0, active: false, search: '' })).toBe(
      '?page=0&active=false&search=',
    );
  });

  it('drops ignored keys', () => {
    expect(buildQueryParams({ page: 1, with: 'user' }, { ignore: ['with'] })).toBe('?page=1');
    expect(buildQueryParams({ with: 'user' }, { ignore: ['with'] })).toBe('');
  });

  it('omits the prefix when asked', () => {
    expect(buildQueryParams({ page: 1 }, { prefix: false })).toBe('page=1');
  });

  it('encodes special characters', () => {
    expect(buildQueryParams({ search: 'a b&c' })).toBe('?search=a+b%26c');
  });

  it('returns an empty string for empty and missing input', () => {
    expect(buildQueryParams({})).toBe('');
    expect(buildQueryParams(null)).toBe('');
    expect(buildQueryParams(undefined)).toBe('');
    expect(buildQueryParams()).toBe('');
  });
});
