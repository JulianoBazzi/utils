import { describe, expect, it } from 'vitest';
import { resolveId } from './resolveId.js';

const resolver = async (id: number) => ({ id });

describe('resolveId', () => {
  it('resolves the id from a string', async () => {
    await expect(resolveId('1', resolver)).resolves.toEqual({ id: 1 });
  });

  it('resolves the first id from a comma-separated string', async () => {
    await expect(resolveId('1,2', resolver)).resolves.toEqual({ id: 1 });
  });

  it('resolves the first id from an array', async () => {
    await expect(resolveId(['5'], resolver)).resolves.toEqual({ id: 5 });
  });

  it('returns null when no valid id is found', async () => {
    await expect(resolveId(undefined, resolver)).resolves.toBeNull();
    await expect(resolveId([], resolver)).resolves.toBeNull();
    await expect(resolveId('abc', resolver)).resolves.toBeNull();
  });
});
