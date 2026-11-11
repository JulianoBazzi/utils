import { describe, expect, it } from 'vitest';
import { joinByKey } from './joinByKey.js';

describe('joinByKey', () => {
  it('joins a property with the default divider', () => {
    expect(joinByKey([{ name: 'a' }, { name: 'b' }], 'name')).toBe('a | b');
  });

  it('uses a custom divider with no double spacing', () => {
    expect(joinByKey([{ id: 1 }, { id: 2 }], 'id', ', ')).toBe('1, 2');
  });

  it('skips falsy entries', () => {
    const values = [{ name: 'a' }, null, { name: 'b' }] as Array<{ name: string } | null>;
    expect(joinByKey(values as { name: string }[], 'name')).toBe('a | b');
  });

  it('returns empty string for an empty array', () => {
    expect(joinByKey([], 'name' as never)).toBe('');
  });

  it('sorts ascending when sort is true', () => {
    expect(joinByKey([{ name: 'b' }, { name: 'a' }, { name: 'c' }], 'name', { sort: true })).toBe(
      'a | b | c',
    );
  });

  it('sorts numbers numerically with a custom divider', () => {
    expect(
      joinByKey([{ id: 2 }, { id: 1 }, { id: 10 }], 'id', { sort: 'asc', divider: ', ' }),
    ).toBe('1, 2, 10');
  });

  it('sorts descending', () => {
    expect(joinByKey([{ id: 1 }, { id: 2 }], 'id', { sort: 'desc', divider: ', ' })).toBe('2, 1');
  });

  it('sorts entries with missing values first, then drops them', () => {
    const values = [{ name: 'b' }, { name: null }, { name: null }, { name: 'a' }] as Array<{
      name: string | null;
    }>;
    expect(joinByKey(values, 'name', { sort: true })).toBe('a | b');
  });

  it('skips null, undefined and empty values', () => {
    const values = [
      { name: 'a' },
      { name: null },
      { name: undefined },
      { name: '' },
      { name: 'b' },
    ] as Array<{ name?: string | null }>;
    expect(joinByKey(values, 'name')).toBe('a | b');
  });

  it('keeps zero, which is falsy but meaningful', () => {
    expect(joinByKey([{ id: 0 }, { id: 1 }], 'id', ', ')).toBe('0, 1');
  });

  it('drops duplicates when unique is set', () => {
    expect(joinByKey([{ name: 'a' }, { name: 'b' }, { name: 'a' }], 'name', { unique: true })).toBe(
      'a | b',
    );
  });

  it('keeps duplicates by default', () => {
    expect(joinByKey([{ name: 'a' }, { name: 'a' }], 'name')).toBe('a | a');
  });

  it('combines unique with sort', () => {
    expect(
      joinByKey([{ name: 'b' }, { name: 'a' }, { name: 'b' }], 'name', {
        unique: true,
        sort: true,
        divider: ', ',
      }),
    ).toBe('a, b');
  });

  it('does not mutate the input array when sorting', () => {
    const values = [{ id: 2 }, { id: 1 }];
    joinByKey(values, 'id', { sort: true });
    expect(values).toEqual([{ id: 2 }, { id: 1 }]);
  });
});

describe('joinByKey — 1.3 additions', () => {
  it('accepts readonly arrays and null', () => {
    const values = [{ name: 'a' }, { name: 'b' }] as const;
    expect(joinByKey(values, 'name')).toBe('a | b');
    expect(joinByKey<{ name: string }, 'name'>(null, 'name')).toBe('');
  });
});
