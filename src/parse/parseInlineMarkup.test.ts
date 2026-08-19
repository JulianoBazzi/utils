import { describe, expect, it } from 'vitest';
import { parseInlineMarkup } from './parseInlineMarkup.js';

describe('parseInlineMarkup', () => {
  it('marks text between asterisks as bold', () => {
    expect(parseInlineMarkup('Olha o *aviso* aqui')).toEqual([
      { text: 'Olha o ' },
      { bold: true, text: 'aviso' },
      { text: ' aqui' },
    ]);
  });

  it('marks text between underscores as italic', () => {
    expect(parseInlineMarkup('_cálculo_ novo')).toEqual([
      { italic: true, text: 'cálculo' },
      { text: ' novo' },
    ]);
  });

  it('nests bold and italic', () => {
    expect(parseInlineMarkup('*_os dois_*')).toEqual([
      { bold: true, italic: true, text: 'os dois' },
    ]);
  });

  it('keeps the marker literal when it never closes', () => {
    expect(parseInlineMarkup('2 * 3 = 6')).toEqual([{ text: '2 * 3 = 6' }]);
    expect(parseInlineMarkup('total_horas')).toEqual([{ text: 'total_horas' }]);
  });

  it('keeps the marker literal when the run would be empty', () => {
    expect(parseInlineMarkup('a ** b')).toEqual([{ text: 'a ** b' }]);
  });

  it('keeps an odd trailing marker literal', () => {
    expect(parseInlineMarkup('*a*b*')).toEqual([{ bold: true, text: 'a' }, { text: 'b*' }]);
  });

  it('returns a single segment when there is no markup', () => {
    expect(parseInlineMarkup('texto simples')).toEqual([{ text: 'texto simples' }]);
  });

  it('returns an empty list when there is no text', () => {
    expect(parseInlineMarkup()).toEqual([]);
    expect(parseInlineMarkup(null)).toEqual([]);
    expect(parseInlineMarkup('')).toEqual([]);
  });

  it('accepts custom markers', () => {
    expect(parseInlineMarkup('~forte~ e /leve/', { boldMarker: '~', italicMarker: '/' })).toEqual([
      { bold: true, text: 'forte' },
      { text: ' e ' },
      { italic: true, text: 'leve' },
    ]);

    expect(parseInlineMarkup('*sem efeito*', { boldMarker: '~' })).toEqual([
      { text: '*sem efeito*' },
    ]);
  });
});
