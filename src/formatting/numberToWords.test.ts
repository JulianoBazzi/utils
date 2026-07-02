import { describe, expect, it } from 'vitest';
import { numberToWords } from './numberToWords.js';

describe('numberToWords', () => {
  it('spells units, teens and tens', () => {
    expect(numberToWords(0)).toBe('zero');
    expect(numberToWords(5)).toBe('cinco');
    expect(numberToWords(15)).toBe('quinze');
    expect(numberToWords(21)).toBe('vinte e um');
    expect(numberToWords(40)).toBe('quarenta');
  });

  it('spells hundreds ("cem" vs "cento")', () => {
    expect(numberToWords(100)).toBe('cem');
    expect(numberToWords(101)).toBe('cento e um');
    expect(numberToWords(200)).toBe('duzentos');
    expect(numberToWords(999)).toBe('novecentos e noventa e nove');
  });

  it('spells thousands ("mil" without "um")', () => {
    expect(numberToWords(1000)).toBe('mil');
    expect(numberToWords(1100)).toBe('mil e cem');
    expect(numberToWords(1234)).toBe('mil duzentos e trinta e quatro');
    expect(numberToWords(2000)).toBe('dois mil');
  });

  it('spells millions and beyond with the right connectors', () => {
    expect(numberToWords(1000000)).toBe('um milhão');
    expect(numberToWords(2000002)).toBe('dois milhões e dois');
    expect(numberToWords(1234567)).toBe(
      'um milhão duzentos e trinta e quatro mil quinhentos e sessenta e sete',
    );
    expect(numberToWords(2000000000)).toBe('dois bilhões');
    expect(numberToWords(1000000000000)).toBe('um trilhão');
  });

  it('prefixes negatives and ignores decimals', () => {
    expect(numberToWords(-42)).toBe('menos quarenta e dois');
    expect(numberToWords(3.99)).toBe('três');
  });

  it('returns the fallback for missing/invalid/out-of-range input', () => {
    expect(numberToWords()).toBe('');
    expect(numberToWords(null, { fallback: '—' })).toBe('—');
    expect(numberToWords(Number.NaN)).toBe('');
    expect(numberToWords(1e15)).toBe('');
  });
});
