import { describe, expect, it } from 'vitest';
import { isValidDocument } from './isValidDocument.js';

describe('isValidDocument', () => {
  it('validates a CPF', () => {
    expect(isValidDocument('529.982.247-25')).toBe(true);
  });

  it('validates a legacy and alphanumeric CNPJ', () => {
    expect(isValidDocument('11.222.333/0001-81')).toBe(true);
    expect(isValidDocument('12ABC34501DE35')).toBe(true);
  });

  it('rejects other lengths / garbage', () => {
    expect(isValidDocument('123')).toBe(false);
    expect(isValidDocument()).toBe(false);
  });
});
