import { describe, expect, it } from 'vitest';
import { includesText } from './includesText.js';

describe('includesText', () => {
  it('ignores accents, case and extra spaces', () => {
    expect(includesText('São Paulo', 'sao')).toBe(true);
    expect(includesText('São Paulo', '  PAULO ')).toBe(true);
    expect(includesText('São Paulo', 'rio')).toBe(false);
  });

  it('matches everything with an empty search', () => {
    expect(includesText('São Paulo', '')).toBe(true);
    expect(includesText(null, null)).toBe(true);
    expect(includesText(null, 'a')).toBe(false);
  });
});
