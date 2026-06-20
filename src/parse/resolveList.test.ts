import { describe, expect, it } from 'vitest';
import { resolveList } from './resolveList.js';

const resolver = async (id: number) => ({ id });

describe('resolveList', () => {
  it('parses a comma-separated string and resolves each id', async () => {
    await expect(resolveList('1,2', resolver)).resolves.toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('accepts an array of id strings', async () => {
    await expect(resolveList(['1', '2'], resolver)).resolves.toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('returns an empty array for missing input', async () => {
    await expect(resolveList(undefined, resolver)).resolves.toEqual([]);
  });
});
