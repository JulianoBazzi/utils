import { describe, expect, it } from 'vitest';
import { isEqualIgnoringKeys } from './isEqualIgnoringKeys.js';

describe('isEqualIgnoringKeys', () => {
  it('ignores the listed keys', () => {
    expect(
      isEqualIgnoringKeys({ id: 1, updated_at: 'a' }, { id: 1, updated_at: 'b' }, ['updated_at']),
    ).toBe(true);
  });

  it('ignores the listed keys at any depth', () => {
    expect(
      isEqualIgnoringKeys(
        { user: { id: 1, updated_at: 'a' } },
        { user: { id: 1, updated_at: 'b' } },
        ['updated_at'],
      ),
    ).toBe(true);
  });

  it('detects a real change', () => {
    expect(isEqualIgnoringKeys({ id: 1 }, { id: 2 }, ['updated_at'])).toBe(false);
  });

  it('is insensitive to object key order', () => {
    expect(isEqualIgnoringKeys({ a: 1, b: 2 }, { b: 2, a: 1 }, [])).toBe(true);
  });

  it('is sensitive to array order', () => {
    expect(isEqualIgnoringKeys(['a', 'b'], ['b', 'a'], [])).toBe(false);
    expect(isEqualIgnoringKeys(['a', 'b'], ['a', 'b'], [])).toBe(true);
  });

  it('compares primitives and null', () => {
    expect(isEqualIgnoringKeys(1, 1, [])).toBe(true);
    expect(isEqualIgnoringKeys('a', 'b', [])).toBe(false);
    expect(isEqualIgnoringKeys(null, null, [])).toBe(true);
    expect(isEqualIgnoringKeys({ a: null }, { a: null }, [])).toBe(true);
  });

  it('compares every key when none are ignored', () => {
    expect(isEqualIgnoringKeys({ id: 1, updated_at: 'a' }, { id: 1, updated_at: 'b' }, [])).toBe(
      false,
    );
  });
});
