import { describe, expect, it } from 'vitest';
import { sanitizeFileName } from './sanitizeFileName.js';

describe('sanitizeFileName', () => {
  it('replaces forbidden and control characters', () => {
    expect(sanitizeFileName('Relatório: 01/02')).toBe('Relatório- 01-02');
    expect(sanitizeFileName('a\u0000b\u007fc')).toBe('a-b-c');
    expect(sanitizeFileName('a<>b', { replacement: '_' })).toBe('a_b');
  });

  it('collapses whitespace and drops trailing dots and spaces', () => {
    expect(sanitizeFileName('  my   file.  ')).toBe('my file');
  });

  it('removes accents on request', () => {
    expect(sanitizeFileName('Relatório', { removeAccents: true })).toBe('Relatorio');
  });

  it('prefixes Windows reserved names', () => {
    expect(sanitizeFileName('con.txt')).toBe('_con.txt');
    expect(sanitizeFileName('COM1')).toBe('_COM1');
    expect(sanitizeFileName('console')).toBe('console');
  });

  it('cuts by code point and trims the cut', () => {
    expect(sanitizeFileName('ab😀cd', { maxLength: 3 })).toBe('ab😀');
    expect(sanitizeFileName('ab. cd', { maxLength: 4 })).toBe('ab');
    expect(sanitizeFileName('abc', { maxLength: -1, fallback: 'x' })).toBe('x');
  });

  it('returns the fallback when nothing is left', () => {
    expect(sanitizeFileName('...', { fallback: 'Sem Nome' })).toBe('Sem Nome');
    expect(sanitizeFileName(null)).toBe('');
  });
});
