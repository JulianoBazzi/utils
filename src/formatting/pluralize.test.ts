import { describe, expect, it } from 'vitest';
import { pluralize } from './pluralize.js';

describe('pluralize', () => {
  it('uses the plural for 0 and the singular only for ±1', () => {
    expect(pluralize(0, 'tarefa')).toBe('0 tarefas');
    expect(pluralize(1, 'tarefa')).toBe('1 tarefa');
    expect(pluralize(-1, 'dia')).toBe('-1 dia');
    expect(pluralize(2, 'tarefa')).toBe('2 tarefas');
  });

  it('accepts an irregular plural, positional or in options', () => {
    expect(pluralize(1, 'mês', 'meses')).toBe('1 mês');
    expect(pluralize(3, 'mês', { plural: 'meses' })).toBe('3 meses');
  });

  it('can hide or format the count', () => {
    expect(pluralize(2, 'mês', { plural: 'meses', showCount: false })).toBe('meses');
    expect(pluralize(1234, 'registro', { formatCount: (n) => n.toLocaleString('pt-BR') })).toBe(
      '1.234 registros',
    );
  });

  it('treats a missing count as 0', () => {
    expect(pluralize(undefined, 'registro')).toBe('0 registros');
    expect(pluralize(Number.NaN, 'registro')).toBe('0 registros');
  });
});
