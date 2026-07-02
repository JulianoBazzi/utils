import { describe, expect, it } from 'vitest';
import { boletoMod10, boletoMod11 } from './boletoDigits.js';

describe('boletoMod10', () => {
  it('computes the check digit with alternating 2,1 weights', () => {
    expect(boletoMod10('001905009')).toBe(5);
    expect(boletoMod10('0')).toBe(0);
  });
});

describe('boletoMod11', () => {
  it('computes the check digit with 2..9 cycling weights', () => {
    expect(boletoMod11('0019373700000001000500940144816060680935031')).toBe(3);
  });

  it('maps a 0/1 rest to 1 in bank mode and 0 in collection mode', () => {
    expect(boletoMod11('0')).toBe(1);
    expect(boletoMod11('0', 'collection')).toBe(0);
  });
});
