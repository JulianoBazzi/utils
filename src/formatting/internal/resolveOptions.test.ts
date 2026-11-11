import { describe, expect, it } from 'vitest';
import { resolveOptions } from './resolveOptions.js';

interface Options {
  divisor?: number;
  fallback?: string;
}

describe('resolveOptions', () => {
  it('returns an options object as is', () => {
    const options = { divisor: 1 };
    expect(resolveOptions<Options, 'divisor'>(options, 'divisor')).toBe(options);
  });

  it('wraps a positional value under the key, merged over rest', () => {
    expect(resolveOptions<Options, 'divisor'>(10, 'divisor', { fallback: '-' })).toEqual({
      divisor: 10,
      fallback: '-',
    });
    expect(resolveOptions<Options, 'divisor'>(undefined, 'divisor')).toEqual({
      divisor: undefined,
    });
  });
});
