import { describe, expect, it } from 'vitest';
import { isValidBoleto } from './isValidBoleto.js';

describe('isValidBoleto', () => {
  it('accepts a valid bank slip digitable line (masked and unmasked)', () => {
    expect(isValidBoleto('00190500954014481606906809350314337370000000100')).toBe(true);
    expect(isValidBoleto('00190.50095 40144.816069 06809.350314 3 37370000000100')).toBe(true);
    expect(isValidBoleto('00191234546789012345767890123457499990000010000')).toBe(true);
  });

  it('rejects a bank slip line with a mutated digit', () => {
    expect(isValidBoleto('10190500954014481606906809350314337370000000100')).toBe(false); // field 1
    expect(isValidBoleto('00190500954014481606906809350315337370000000100')).toBe(false); // field 3 DV
    expect(isValidBoleto('00190500954014481606906809350314437370000000100')).toBe(false); // general DV
  });

  it('accepts a valid collection line (mod-11 and mod-10 currency digits)', () => {
    expect(isValidBoleto('848800000019234567890128345678901235456789012341')).toBe(true);
    expect(isValidBoleto('846600000018234567890129345678901231456789012345')).toBe(true);
  });

  it('rejects a collection line with a mutated digit', () => {
    expect(isValidBoleto('848800000019234567890128345678901235456789012342')).toBe(false);
    expect(isValidBoleto('848800000029234567890128345678901235456789012341')).toBe(false);
  });

  it('rejects a 48-digit line that does not start with 8', () => {
    expect(isValidBoleto('748800000019234567890128345678901235456789012341')).toBe(false);
  });

  it('rejects a collection line with an invalid currency digit', () => {
    expect(isValidBoleto(`815${'0'.repeat(45)}`)).toBe(false);
  });

  it('rejects a wrong length and missing input', () => {
    expect(isValidBoleto('123')).toBe(false);
    expect(isValidBoleto('')).toBe(false);
    expect(isValidBoleto()).toBe(false);
  });
});
