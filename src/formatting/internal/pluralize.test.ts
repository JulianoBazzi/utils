import { describe, expect, it } from 'vitest';
import { countLabel, pluralForm } from './pluralize.js';

describe('pluralForm / countLabel', () => {
  it('uses the singular only for ±1', () => {
    expect(pluralForm(1, 'dia', 'dias')).toBe('dia');
    expect(pluralForm(-1, 'dia', 'dias')).toBe('dia');
    expect(pluralForm(0, 'dia', 'dias')).toBe('dias');
    expect(pluralForm(2, 'dia', 'dias')).toBe('dias');
  });

  it('prefixes the count', () => {
    expect(countLabel(0, 'tarefa', 'tarefas')).toBe('0 tarefas');
    expect(countLabel(1, 'mês', 'meses')).toBe('1 mês');
  });
});
