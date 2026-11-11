import { describe, expect, it } from 'vitest';
import { formatPIS } from './formatPIS.js';

describe('formatPIS', () => {
  it('formats as 000.00000.00-0', () => {
    expect(formatPIS('12012345672')).toBe('120.12345.67-2');
  });

  it('pads with leading zeros', () => {
    expect(formatPIS('1')).toBe('000.00000.00-1');
  });

  it('returns plain digits when longer than 11 digits', () => {
    expect(formatPIS('123456789012')).toBe('123456789012');
  });

  it('returns empty string or the fallback for missing input', () => {
    expect(formatPIS()).toBe('');
    expect(formatPIS('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatPIS — 1.3 additions', () => {
  it('pads by default and leaves incomplete input unmasked with pad: false', () => {
    expect(formatPIS('1201234567')).toBe('012.01234.56-7');
    expect(formatPIS('1201234567', { pad: false })).toBe('1201234567');
    expect(formatPIS('12012345672', { pad: false })).toBe(formatPIS('12012345672'));
  });
});
