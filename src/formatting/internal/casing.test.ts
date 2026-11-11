import { describe, expect, it } from 'vitest';
import { capitalize, titleCase } from './casing.js';

describe('capitalize', () => {
  it('uppercases only the first character', () => {
    expect(capitalize('julho')).toBe('Julho');
    expect(capitalize('kB')).toBe('KB');
    expect(capitalize('')).toBe('');
  });
});

describe('titleCase', () => {
  it('preserves the rest of each word by default', () => {
    expect(titleCase('são paulo')).toBe('São Paulo');
    expect(titleCase('1.50 kB')).toBe('1.50 KB');
  });

  it('lowercases first with normalize', () => {
    expect(titleCase('JOÃO DA SILVA', { normalize: true })).toBe('João Da Silva');
  });

  it('keeps lowercaseWords in lowercase except at the start', () => {
    const lowercaseWords = ['de', 'da', 'e'];
    expect(titleCase('joão DA silva e souza', { lowercaseWords })).toBe('João da Silva e Souza');
    expect(titleCase('de souza', { lowercaseWords })).toBe('De Souza');
  });
});
