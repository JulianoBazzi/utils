import { describe, expect, it } from 'vitest';
import { fitWithin } from './fitWithin.js';

describe('fitWithin', () => {
  it('scales the longer edge down to maxEdge', () => {
    expect(fitWithin(4000, 3000, 1000)).toEqual({ width: 1000, height: 750 });
    expect(fitWithin(3000, 4000, 1000)).toEqual({ width: 750, height: 1000 });
  });

  it('never upscales and keeps at least 1px', () => {
    expect(fitWithin(800, 600, 1000)).toEqual({ width: 800, height: 600 });
    expect(fitWithin(10000, 1, 100)).toEqual({ width: 100, height: 1 });
  });

  it('returns 0 × 0 for an empty size or a non-positive maxEdge', () => {
    expect(fitWithin(0, 0, 100)).toEqual({ width: 0, height: 0 });
    expect(fitWithin(100, 0, 50)).toEqual({ width: 50, height: 0 });
    expect(fitWithin(100, 100, 0)).toEqual({ width: 0, height: 0 });
  });
});
