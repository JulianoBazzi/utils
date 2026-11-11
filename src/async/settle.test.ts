import { describe, expect, it } from 'vitest';
import { settle } from './settle.js';

describe('settle', () => {
  it('wraps a resolved promise or function', async () => {
    await expect(settle(Promise.resolve(1))).resolves.toEqual({ ok: true, value: 1 });
    await expect(settle(() => 2)).resolves.toEqual({ ok: true, value: 2 });
  });

  it('wraps a rejection or a synchronous throw', async () => {
    const error = new Error('x');
    await expect(settle(Promise.reject(error))).resolves.toEqual({ ok: false, error });
    await expect(
      settle(() => {
        throw error;
      }),
    ).resolves.toEqual({ ok: false, error });
  });
});
