import { describe, expect, it } from 'vitest';
import { diffLines } from './diffLines.js';

describe('diffLines', () => {
  it('flags nothing when both texts are identical', () => {
    const { beforeLines, afterLines } = diffLines('a\nb', 'a\nb');

    expect(beforeLines).toEqual([
      { text: 'a', changed: false },
      { text: 'b', changed: false },
    ]);
    expect(afterLines).toEqual(beforeLines);
  });

  it('flags a substituted line on both sides', () => {
    expect(diffLines('a\nb', 'a\nc')).toEqual({
      beforeLines: [
        { text: 'a', changed: false },
        { text: 'b', changed: true },
      ],
      afterLines: [
        { text: 'a', changed: false },
        { text: 'c', changed: true },
      ],
    });
  });

  it('flags an inserted line only on the after side', () => {
    expect(diffLines('a\nb', 'a\nx\nb')).toEqual({
      beforeLines: [
        { text: 'a', changed: false },
        { text: 'b', changed: false },
      ],
      afterLines: [
        { text: 'a', changed: false },
        { text: 'x', changed: true },
        { text: 'b', changed: false },
      ],
    });
  });

  it('flags a removed line only on the before side', () => {
    expect(diffLines('a\nx\nb', 'a\nb')).toEqual({
      beforeLines: [
        { text: 'a', changed: false },
        { text: 'x', changed: true },
        { text: 'b', changed: false },
      ],
      afterLines: [
        { text: 'a', changed: false },
        { text: 'b', changed: false },
      ],
    });
  });

  it('treats missing input as a single empty line', () => {
    expect(diffLines()).toEqual({
      beforeLines: [{ text: '', changed: false }],
      afterLines: [{ text: '', changed: false }],
    });

    expect(diffLines(null, 'a')).toEqual({
      beforeLines: [{ text: '', changed: true }],
      afterLines: [{ text: 'a', changed: true }],
    });

    expect(diffLines('a', null)).toEqual({
      beforeLines: [{ text: 'a', changed: true }],
      afterLines: [{ text: '', changed: true }],
    });
  });
});
