import { describe, expect, it } from 'vitest';
import { normalizePhone } from './normalizePhone.js';

describe('normalizePhone', () => {
  it('strips the country code only when 10–11 digits remain', () => {
    expect(normalizePhone('5511987654321').digits).toBe('11987654321');
    expect(normalizePhone('551198765432100').digits).toBe('551198765432100');
    expect(normalizePhone('5511987654321', null).digits).toBe('5511987654321');
    expect(normalizePhone('55987654321').digits).toBe('55987654321');
    expect(normalizePhone('351912345678', '351').digits).toBe('912345678');
    expect(normalizePhone('35112', '351').digits).toBe('35112');
  });

  it('detects non-geographic numbers', () => {
    expect(normalizePhone('0800 123 4567')).toEqual({ digits: '08001234567', nonGeographic: true });
    expect(normalizePhone('0300 123456').nonGeographic).toBe(true);
  });

  it('drops a trunk 0 from 11–12 digit numbers', () => {
    expect(normalizePhone('011987654321').digits).toBe('11987654321');
    expect(normalizePhone('01134567890').digits).toBe('1134567890');
    expect(normalizePhone('0123').digits).toBe('0123');
  });

  it('handles missing input', () => {
    expect(normalizePhone(null).digits).toBe('');
  });
});
