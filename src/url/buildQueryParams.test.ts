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

describe('buildQueryParams — 1.3 additions', () => {
  it('skips empty strings with skipEmpty', () => {
    expect(buildQueryParams({ search: '', page: 1 }, { skipEmpty: true })).toBe('?page=1');
    expect(buildQueryParams({ search: '' })).toBe('?search=');
    expect(buildQueryParams({ ids: ['', 1] }, { skipEmpty: true })).toBe('?ids=1');
  });

  it('writes dates as ISO and objects as JSON', () => {
    expect(buildQueryParams({ d: new Date('2026-01-02T03:04:05Z') })).toBe(
      '?d=2026-01-02T03%3A04%3A05.000Z',
    );
    expect(buildQueryParams({ d: new Date('x') })).toBe('');
    expect(buildQueryParams({ f: { a: 1 } }, { prefix: false })).toBe('f=%7B%22a%22%3A1%7D');
  });
});
