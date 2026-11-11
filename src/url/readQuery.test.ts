import { describe, expect, it } from 'vitest';
import { readQueryArray } from './readQueryArray.js';
import { readQueryBoolean } from './readQueryBoolean.js';
import { readQueryDate } from './readQueryDate.js';
import { readQueryEnum } from './readQueryEnum.js';
import { readQueryIds } from './readQueryIds.js';
import { readQueryNumber } from './readQueryNumber.js';
import { readQueryRange } from './readQueryRange.js';
import { readQueryString } from './readQueryString.js';

const fallback = { startDate: '2026-03-01', endDate: '2026-03-31' };

describe('readQuery*', () => {
  describe('★ contrato nextjs-utils', () => {
    it('readQueryBoolean', () => {
      expect(readQueryBoolean('showAlert=false', 'showAlert')).toBe(false);
    });

    it('readQueryNumber', () => {
      expect(readQueryNumber('id=1.5', 'id', { integer: true })).toBeUndefined();
      expect(readQueryNumber('id=-1', 'id', { min: 1 })).toBeUndefined();
    });

    it('readQueryIds', () => {
      expect(readQueryIds({ id: ['1,2', '2', 'x', '-3'] }, 'id')).toEqual([1, 2]);
    });

    it('readQueryRange', () => {
      expect(readQueryRange('start=2026-03-10&end=2026-03-01', ['start', 'end'], fallback)).toEqual(
        { startDate: '2026-03-01', endDate: '2026-03-10' },
      );
    });
  });

  it('readQueryString returns the first non-empty value', () => {
    expect(readQueryString('search=a&search=b', 'search')).toBe('a');
    expect(readQueryString('search=&search=b', 'search')).toBe('b');
    expect(readQueryString('search=', 'search')).toBeUndefined();
    expect(readQueryString(undefined, 'search')).toBeUndefined();
  });

  it('readQueryArray returns every non-empty value', () => {
    expect(readQueryArray({ tag: ['a', '', 'b'] }, 'tag')).toEqual(['a', 'b']);
    expect(readQueryArray({ tag: 'a' }, 'tag')).toEqual(['a']);
    expect(readQueryArray('', 'tag')).toEqual([]);
  });

  it('readQueryNumber accepts plain decimals only', () => {
    expect(readQueryNumber('n=12', 'n')).toBe(12);
    expect(readQueryNumber('n=-1.5', 'n')).toBe(-1.5);
    expect(readQueryNumber('n=1e3', 'n')).toBeUndefined();
    expect(readQueryNumber('n=0x10', 'n')).toBeUndefined();
    expect(readQueryNumber('n=Infinity', 'n')).toBeUndefined();
    expect(readQueryNumber('n=', 'n')).toBeUndefined();
    expect(readQueryNumber('n=11', 'n', { max: 10 })).toBeUndefined();
    expect(readQueryNumber('n=10', 'n', { min: 1, max: 10 })).toBe(10);
  });

  it('readQueryBoolean reads true/1/false/0 only', () => {
    expect(readQueryBoolean('a=true', 'a')).toBe(true);
    expect(readQueryBoolean('a=1', 'a')).toBe(true);
    expect(readQueryBoolean('a=0', 'a')).toBe(false);
    expect(readQueryBoolean('a=yes', 'a')).toBeUndefined();
    expect(readQueryBoolean('', 'a')).toBeUndefined();
  });

  it('readQueryEnum validates against the allowed list', () => {
    const tabs = ['info', 'files'] as const;
    expect(readQueryEnum('tab=files', 'tab', tabs)).toBe('files');
    expect(readQueryEnum('tab=other', 'tab', tabs)).toBeUndefined();
    expect(readQueryEnum('', 'tab', tabs)).toBeUndefined();
  });

  it('readQueryDate accepts real calendar dates only', () => {
    expect(readQueryDate('d=2026-03-01', 'd')).toBe('2026-03-01');
    expect(readQueryDate('d=2026-02-30', 'd')).toBeUndefined();
  });

  it('readQueryIds caps the result with max', () => {
    expect(readQueryIds('id=1,2,3', 'id', { max: 2 })).toEqual([1, 2]);
    expect(readQueryIds('id=1', 'id', { max: -1 })).toEqual([]);
  });

  it('readQueryRange falls back per end and clamps', () => {
    expect(readQueryRange('start=nope', ['start', 'end'], fallback)).toEqual(fallback);
    expect(readQueryRange('end=2026-03-10', ['start', 'end'], fallback)).toEqual({
      startDate: '2026-03-01',
      endDate: '2026-03-10',
    });
    expect(
      readQueryRange('start=2026-01-01', ['start', 'end'], fallback, { min: '2026-02-15' }),
    ).toEqual({ startDate: '2026-02-15', endDate: '2026-03-31' });
  });
});
