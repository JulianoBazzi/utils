import { describe, expect, it } from 'vitest';
import { normalizeText } from './normalizeText.js';

describe('normalizeText', () => {
  it('removes accents, lowercases, collapses spaces and trims', () => {
    expect(normalizeText('  São   Paulo ')).toBe('sao paulo');
  });

  it('is configurable', () => {
    expect(normalizeText('Perecíveis', { casing: 'uppercase' })).toBe('PERECIVEIS');
    expect(
      normalizeText(' São  Paulo ', { casing: 'none', collapseWhitespace: false, trim: false }),
    ).toBe(' Sao  Paulo ');
  });

  it('can keep accents', () => {
    expect(normalizeText('São', { removeAccents: false })).toBe('são');
    expect(normalizeText(null, { removeAccents: false })).toBe('');
  });

  it('returns "" for missing input', () => {
    expect(normalizeText(null)).toBe('');
  });
});
