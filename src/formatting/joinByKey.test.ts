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

  it('does not mutate the input array when sorting', () => {
    const values = [{ id: 2 }, { id: 1 }];
    joinByKey(values, 'id', { sort: true });
    expect(values).toEqual([{ id: 2 }, { id: 1 }]);
  });
});
