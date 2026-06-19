import { describe, expect, it } from 'vitest';
import { applyCasing } from './applyCasing.js';

describe('applyCasing', () => {
  it('returns the value unchanged with no casing', () => {
    expect(applyCasing('São Paulo')).toBe('São Paulo');
  });

  it('lowercases', () => {
    expect(applyCasing('São Paulo', 'lowercase')).toBe('são paulo');
  });

  it('uppercases', () => {
    expect(applyCasing('São Paulo', 'uppercase')).toBe('SÃO PAULO');
  });

  it('title-cases each word', () => {
    expect(applyCasing('são paulo', 'titlecase')).toBe('São Paulo');
  });

  it('preserves the rest of a word in titlecase (keeps unit symbols)', () => {
    expect(applyCasing('1.50 KB', 'titlecase')).toBe('1.50 KB');
  });
});
