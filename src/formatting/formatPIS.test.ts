import { describe, expect, it } from 'vitest';
import { formatPIS } from './formatPIS.js';

describe('formatPIS', () => {
  it('formats as 000.00000.00-0', () => {
    expect(formatPIS('12012345672')).toBe('120.12345.67-2');
  });

  it('pads with leading zeros', () => {
    expect(formatPIS('1')).toBe('000.00000.00-1');
  });

  it('returns empty string or the fallback for missing input', () => {
    expect(formatPIS()).toBe('');
    expect(formatPIS('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});
