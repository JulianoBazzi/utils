import { describe, expect, it } from 'vitest';
import { omitFields } from './omitFields.js';

describe('omitFields', () => {
  it('removes the given keys', () => {
    expect(omitFields({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('removes multiple keys', () => {
    expect(omitFields({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 });
  });

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2 };
    omitFields(obj, ['a']);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
