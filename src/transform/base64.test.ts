import { describe, expect, it } from 'vitest';
import { bytesToBase64 } from './bytesToBase64.js';
import { toDataUrl } from './toDataUrl.js';

describe('bytesToBase64', () => {
  it('encodes bytes', () => {
    expect(bytesToBase64(new TextEncoder().encode('hi'))).toBe('aGk=');
    expect(bytesToBase64(new Uint8Array())).toBe('');
  });

  it('handles buffers larger than one chunk', () => {
    const bytes = new Uint8Array(100_000).fill(65);
    expect(atob(bytesToBase64(bytes))).toBe('A'.repeat(100_000));
  });
});

describe('toDataUrl', () => {
  it('builds a data URL from bytes or base64', () => {
    expect(toDataUrl('text/plain', new TextEncoder().encode('hi'))).toBe(
      'data:text/plain;base64,aGk=',
    );
    expect(toDataUrl('text/plain', 'aGk=')).toBe('data:text/plain;base64,aGk=');
  });
});
