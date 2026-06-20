import { describe, expect, it } from 'vitest';
import { getLabelById } from './getLabelById.js';

const options = [
  { id: 1, name: 'A', label: 'Alpha' },
  { id: 2, name: 'B', label: 'Beta' },
];

describe('getLabelById', () => {
  it('returns the name by default', () => {
    expect(getLabelById(options, '1')).toBe('A');
  });

  it('returns a custom key', () => {
    expect(getLabelById(options, '2', 'label')).toBe('Beta');
  });

  it('returns the fallback when there is no match', () => {
    expect(getLabelById(options, '9')).toBe('');
    expect(getLabelById(options, '9', 'name', '—')).toBe('—');
  });

  it('returns the fallback for missing value', () => {
    expect(getLabelById(options, undefined, 'name', '—')).toBe('—');
  });
});
