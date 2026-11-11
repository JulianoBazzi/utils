import { describe, expect, it } from 'vitest';
import { formatCityAndState } from './formatCityAndState.js';

describe('formatCityAndState', () => {
  it('joins city and state', () => {
    expect(formatCityAndState('São Paulo', 'SP')).toBe('São Paulo - SP');
  });

  it('omits the dash when only one is present', () => {
    expect(formatCityAndState('São Paulo')).toBe('São Paulo');
    expect(formatCityAndState(undefined, 'SP')).toBe('SP');
  });

  it('uses a custom separator', () => {
    expect(formatCityAndState('São Paulo', 'SP', { separator: '/' })).toBe('São Paulo/SP');
  });

  it('returns the fallback when both are empty', () => {
    expect(formatCityAndState()).toBe('');
    expect(formatCityAndState('', '')).toBe('');
    expect(formatCityAndState('', '', { fallback: 'Não Informado' })).toBe('Não Informado');
  });
});

describe('formatCityAndState — 1.3 additions', () => {
  it('trims both parts', () => {
    expect(formatCityAndState(' ', 'SP')).toBe('SP');
    expect(formatCityAndState(' São Paulo ', ' SP ')).toBe('São Paulo - SP');
    expect(formatCityAndState(' ', ' ', { fallback: '-' })).toBe('-');
  });

  it('accepts a casing', () => {
    expect(formatCityAndState('são paulo', 'sp', { casing: 'uppercase' })).toBe('SÃO PAULO - SP');
  });
});
