import { describe, expect, it } from 'vitest';
import { parseJson } from './parseJson.js';

describe('parseJson', () => {
  it('parses valid JSON', () => {
    expect(parseJson<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
    expect(parseJson('[1,2]')).toEqual([1, 2]);
  });

  it('returns undefined for malformed JSON', () => {
    expect(parseJson('not json')).toBeUndefined();
    expect(parseJson('{"a":')).toBeUndefined();
  });

  it('returns undefined for missing input', () => {
    expect(parseJson()).toBeUndefined();
    expect(parseJson(null)).toBeUndefined();
    expect(parseJson('')).toBeUndefined();
  });

  it('keeps a parsed null distinct from a parse failure', () => {
    expect(parseJson('null')).toBeNull();
  });
});
