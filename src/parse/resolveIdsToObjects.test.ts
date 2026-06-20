import { describe, expect, it } from 'vitest';
import { resolveIdsToObjects } from './resolveIdsToObjects.js';

const resolver = async (id: number) => ({ id });

describe('resolveIdsToObjects', () => {
  it('resolves each id into an object', async () => {
    await expect(resolveIdsToObjects([1, 2], resolver)).resolves.toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('returns an empty array for empty/missing input', async () => {
    await expect(resolveIdsToObjects([], resolver)).resolves.toEqual([]);
    await expect(resolveIdsToObjects(undefined, resolver)).resolves.toEqual([]);
  });

  it('forwards params to the resolver', async () => {
    const withParams = async (id: number, params?: string) => ({ id, params });
    await expect(resolveIdsToObjects([1], withParams, 'x')).resolves.toEqual([
      { id: 1, params: 'x' },
    ]);
  });
});
