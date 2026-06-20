import { describe, expect, it } from 'vitest';
import {
  CELLPHONE_MASK,
  CNPJ_ALPHANUMERIC_MASK,
  CNPJ_MASK,
  CPF_MASK,
  PHONE_MASK,
  POSTAL_CODE_MASK,
} from './masks.js';

describe('mask constants', () => {
  it('exposes the expected patterns', () => {
    expect(CPF_MASK).toBe('999.999.999-99');
    expect(CNPJ_MASK).toBe('99.999.999/9999-99');
    expect(CNPJ_ALPHANUMERIC_MASK).toBe('**.***.***/****-99');
    expect(PHONE_MASK).toBe('(99) 9999-9999');
    expect(CELLPHONE_MASK).toBe('(99) 99999-9999');
    expect(POSTAL_CODE_MASK).toBe('99999-999');
  });
});
