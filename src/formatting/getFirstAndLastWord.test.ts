import { describe, expect, it } from 'vitest';
import { getFirstAndLastWord } from './getFirstAndLastWord.js';

describe('getFirstAndLastWord', () => {
  it('drops everything between the first and last word', () => {
    expect(getFirstAndLastWord('Analista de Sistemas')).toBe('Analista Sistemas');
    expect(getFirstAndLastWord('Coordenador de Recursos Humanos')).toBe('Coordenador Humanos');
  });

  it('keeps both words when there are exactly two', () => {
    expect(getFirstAndLastWord('Gerente Comercial')).toBe('Gerente Comercial');
  });

  it('returns single-word texts unchanged', () => {
    expect(getFirstAndLastWord('Gerente')).toBe('Gerente');
  });

  it('trims and collapses extra whitespace', () => {
    expect(getFirstAndLastWord('  Analista   de   Sistemas  ')).toBe('Analista Sistemas');
  });

  it('returns the fallback for empty, blank or missing input', () => {
    expect(getFirstAndLastWord()).toBe('');
    expect(getFirstAndLastWord(null)).toBe('');
    expect(getFirstAndLastWord('   ')).toBe('');
    expect(getFirstAndLastWord('', { fallback: 'Não Informado' })).toBe('Não Informado');
  });

  it('applies the requested casing', () => {
    expect(getFirstAndLastWord('analista de sistemas', { casing: 'uppercase' })).toBe(
      'ANALISTA SISTEMAS',
    );
    expect(getFirstAndLastWord('Analista de Sistemas', { casing: 'lowercase' })).toBe(
      'analista sistemas',
    );
  });
});
