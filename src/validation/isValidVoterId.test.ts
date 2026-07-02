import { describe, expect, it } from 'vitest';
import { isValidVoterId } from './isValidVoterId.js';

describe('isValidVoterId', () => {
  it('accepts a valid voter id (masked and unmasked)', () => {
    expect(isValidVoterId('123456780396')).toBe(true);
    expect(isValidVoterId('1234 5678 0396')).toBe(true);
  });

  it('applies the SP/MG exception (rest 0 → digit 1)', () => {
    expect(isValidVoterId('111111110116')).toBe(true);
  });

  it('rejects an invalid state code', () => {
    expect(isValidVoterId('123456780096')).toBe(false);
    expect(isValidVoterId('123456782996')).toBe(false);
  });

  it('rejects a bad check digit', () => {
    expect(isValidVoterId('123456780386')).toBe(false);
    expect(isValidVoterId('123456780397')).toBe(false);
  });

  it('rejects a wrong length and missing input', () => {
    expect(isValidVoterId('1234567803961')).toBe(false);
    expect(isValidVoterId('')).toBe(false);
    expect(isValidVoterId()).toBe(false);
  });
});
