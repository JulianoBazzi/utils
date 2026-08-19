import { describe, expect, it } from 'vitest';
import { maskFields } from './maskFields.js';

describe('maskFields', () => {
  it('masks matching string fields at any depth', () => {
    expect(
      maskFields({ user: { name: 'Ana', password: 's3cr3t-value-here' } }, ['password']),
    ).toEqual({
      user: { name: 'Ana', password: 's3cr3••••••-here' },
    });
  });

  it('masks matching fields inside arrays', () => {
    expect(maskFields({ users: [{ token: 'abcdefghijklmno' }] }, ['token'])).toEqual({
      users: [{ token: 'abcde••••••klmno' }],
    });
  });

  it('leaves non-string values under a matched key untouched', () => {
    expect(maskFields({ password: null, attempts: 3 }, ['password'])).toEqual({
      password: null,
      attempts: 3,
    });
  });

  it('returns an equal copy when nothing matches', () => {
    const input = { a: 1, b: { c: 'plain' } };

    expect(maskFields(input, ['password'])).toEqual(input);
    expect(maskFields(input, ['password'])).not.toBe(input);
  });

  it('accepts a custom mask', () => {
    expect(maskFields({ token: 'abc' }, ['token'], { mask: () => '[redacted]' })).toEqual({
      token: '[redacted]',
    });
  });

  it('returns missing input unchanged', () => {
    expect(maskFields(null, ['password'])).toBeNull();
    expect(maskFields(undefined, ['password'])).toBeUndefined();
  });
});
