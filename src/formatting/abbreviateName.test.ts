import { describe, expect, it } from 'vitest';
import { abbreviateName } from './abbreviateName.js';

describe('abbreviateName', () => {
  it('abbreviates first name + last initial', () => {
    expect(abbreviateName('John Smith')).toBe('John S.');
  });

  it('returns single-word names unchanged', () => {
    expect(abbreviateName('John')).toBe('John');
  });

  it('trims and collapses extra whitespace', () => {
    expect(abbreviateName('  John   Smith  ')).toBe('John S.');
  });

  it('returns empty string for missing input', () => {
    expect(abbreviateName()).toBe('');
    expect(abbreviateName('')).toBe('');
  });

  it('normalizes casing with titlecase', () => {
    expect(abbreviateName('JOAO SILVA', { casing: 'titlecase' })).toBe('Joao S.');
    expect(abbreviateName('JOAO', { casing: 'titlecase' })).toBe('Joao');
  });

  it('applies uppercase and lowercase casing', () => {
    expect(abbreviateName('john smith', { casing: 'uppercase' })).toBe('JOHN S.');
    expect(abbreviateName('John Smith', { casing: 'lowercase' })).toBe('john s.');
  });

  it('returns an empty string for blank input', () => {
    expect(abbreviateName('   ')).toBe('');
  });
});

describe('abbreviateName — 1.3 additions', () => {
  it('uses the initial of the last word', () => {
    expect(abbreviateName('Maria de Souza')).toBe('Maria S.');
    expect(abbreviateName('John Paul Smith')).toBe('John S.');
    expect(abbreviateName('MARIA DE SOUZA', { casing: 'titlecase' })).toBe('Maria S.');
  });

  it('trims a single word', () => {
    expect(abbreviateName('  João  ')).toBe('João');
  });
});
