import { describe, expect, it } from 'vitest';
import { getFirstFieldError } from './getFirstFieldError.js';

describe('getFirstFieldError', () => {
  it('finds the first nested message with its dot path', () => {
    expect(
      getFirstFieldError({
        name: { type: 'required', message: '' },
        items: [undefined, { price: { type: 'min', message: 'Inválido' } }],
        email: { message: 'Outro' },
      }),
    ).toEqual({ name: 'items.1.price', message: 'Inválido' });
  });

  it('skips refs and survives cycles', () => {
    const ref: Record<string, unknown> = { message: 'not this one' };
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(getFirstFieldError({ a: { ref }, b: cyclic, c: { message: 'Erro' } })).toEqual({
      name: 'c',
      message: 'Erro',
    });
  });

  it('returns undefined when there is no message', () => {
    expect(getFirstFieldError({})).toBeUndefined();
    expect(getFirstFieldError(null)).toBeUndefined();
    expect(getFirstFieldError({ a: { message: 42 } })).toBeUndefined();
  });
});
