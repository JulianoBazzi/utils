import { describe, expect, it } from 'vitest';
import { stripInlineMarkup } from './stripInlineMarkup.js';

describe('stripInlineMarkup', () => {
  it('removes the markup characters', () => {
    expect(stripInlineMarkup('Olha o *aviso* aqui')).toBe('Olha o aviso aqui');
    expect(stripInlineMarkup('*_os dois_*')).toBe('os dois');
  });

  it('leaves text without markup unchanged', () => {
    expect(stripInlineMarkup('texto simples')).toBe('texto simples');
  });

  it('keeps literal markers that never open a run', () => {
    expect(stripInlineMarkup('2 * 3 = 6')).toBe('2 * 3 = 6');
  });

  it('returns an empty string for missing input', () => {
    expect(stripInlineMarkup()).toBe('');
    expect(stripInlineMarkup(null)).toBe('');
  });

  it('honours custom markers', () => {
    expect(stripInlineMarkup('~forte~', { boldMarker: '~' })).toBe('forte');
  });
});
