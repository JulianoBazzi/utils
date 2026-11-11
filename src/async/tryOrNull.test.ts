import { describe, expect, it } from 'vitest';
import { tryOrNull } from './tryOrNull.js';

describe('tryOrNull', () => {
  it('returns the value', async () => {
    await expect(tryOrNull(() => 1)).resolves.toBe(1);
    await expect(tryOrNull(async () => 'a')).resolves.toBe('a');
  });

  it('returns null for every error by default', async () => {
    await expect(tryOrNull(() => Promise.reject(new Error('x')))).resolves.toBeNull();
  });

  it('rethrows errors that `when` rejects', async () => {
    const notFound = Object.assign(new Error('404'), { status: 404 });
    const outage = Object.assign(new Error('500'), { status: 500 });
    const when = (error: unknown) => (error as { status?: number }).status === 404;
    await expect(tryOrNull(() => Promise.reject(notFound), { when })).resolves.toBeNull();
    await expect(tryOrNull(() => Promise.reject(outage), { when })).rejects.toBe(outage);
  });
});
