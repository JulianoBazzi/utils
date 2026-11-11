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

  it('tolerates undefined/null elements in the array', async () => {
    await expect(resolveList(['1', undefined, '2', null], resolver)).resolves.toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('returns an empty array for missing input', async () => {
    await expect(resolveList(undefined, resolver)).resolves.toEqual([]);
  });
});

describe('resolveList — 1.3 additions', () => {
  it('drops rejected ids with skipErrors', async () => {
    const resolver = (id: number) =>
      id === 2 ? Promise.reject(new Error('gone')) : Promise.resolve(id * 10);
    await expect(resolveList('1,2,3', resolver, undefined, { skipErrors: true })).resolves.toEqual([
      10, 30,
    ]);
    await expect(resolveList('1,2,3', resolver)).rejects.toThrow('gone');
  });
});
