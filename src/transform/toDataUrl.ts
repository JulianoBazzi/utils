import { bytesToBase64 } from './bytesToBase64.js';

/**
 * Build a `data:` URL from a MIME type and either raw bytes or a base64
 * string (used as is).
 *
 * @example
 * toDataUrl("image/png", bytes) // "data:image/png;base64,iVBOR..."
 * toDataUrl("text/plain", "aGk=") // "data:text/plain;base64,aGk="
 */
export function toDataUrl(mimeType: string, data: Uint8Array | string): string {
  const base64 = typeof data === 'string' ? data : bytesToBase64(data);
  return `data:${mimeType};base64,${base64}`;
}
