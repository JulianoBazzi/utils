const CHUNK = 0x8000;

/**
 * Encode bytes as base64, in 32 KiB chunks so large buffers don't blow the
 * call stack (`String.fromCharCode(...bytes)`) or crawl (one char at a time).
 * Uses `btoa`, available in browsers and Node 16+.
 *
 * @example
 * bytesToBase64(new TextEncoder().encode("hi")) // "aGk="
 */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let index = 0; index < bytes.length; index += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(index, index + CHUNK));
  }
  return btoa(binary);
}
