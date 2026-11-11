import { describe, expect, expectTypeOf, it } from 'vitest';
import { toArray } from './toArray.js';

describe('toArray', () => {
  it('wraps a single value', () => {
    expect(toArray('a')).toEqual(['a']);
    expect(toArray(0)).toEqual([0]);
    expect(toArray('')).toEqual(['']);
  });

  it('copies an array and drops nullish items', () => {
    const input = ['a', null, 'b', undefined];
    const result = toArray(input);
    expect(result).toEqual(['a', 'b']);
    expect(result).not.toBe(input);
  });

  it('returns [] for missing input', () => {
    expect(toArray(undefined)).toEqual([]);
    expect(toArray(null)).toEqual([]);
  });

  it('infers the item type from a value-or-array union', () => {
    const value = 'a' as string | string[] | undefined;
    expectTypeOf(toArray(value)).toEqualTypeOf<string[]>();
    expectTypeOf(toArray([1, 2] as readonly number[])).toEqualTypeOf<number[]>();
  });
});
