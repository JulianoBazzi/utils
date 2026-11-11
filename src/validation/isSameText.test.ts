import { describe, expect, it } from 'vitest';
import { isSameText } from './isSameText.js';

describe('isSameText', () => {
  it('ignores accents, case and repeated spaces by default', () => {
    expect(isSameText('  Excluir   Usuário ', 'excluir usuario')).toBe(true);
  });

  it('is configurable', () => {
    expect(isSameText('Excluir', 'excluir', { ignoreCase: false })).toBe(false);
    expect(isSameText('Usuário', 'usuario', { ignoreAccents: false })).toBe(false);
    expect(isSameText('a  b', 'a b', { collapseWhitespace: false })).toBe(false);
  });

  it('never matches an empty side', () => {
    expect(isSameText('', '')).toBe(false);
    expect(isSameText(null, 'a')).toBe(false);
  });
});
