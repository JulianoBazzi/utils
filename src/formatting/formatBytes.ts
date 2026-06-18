/**
 * Format a byte count as a human-readable size (Bytes/KB/MB/GB).
 * When `round` is true, values are rounded to integers instead of 2 decimals.
 *
 * @example
 * formatBytes(1536) // "1.50 KB"
 * formatBytes(1536, true) // "2 KB"
 */
export function formatBytes(bytes?: number, round = false): string {
  if (!bytes) {
    return "0 Bytes";
  }

  if (bytes < 1024) {
    return `${bytes} Bytes`;
  }

  if (bytes < 1024 ** 2) {
    return round ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1024 ** 3) {
    return round ? `${Math.round(bytes / 1024 ** 2)} MB` : `${(bytes / 1024 ** 2).toFixed(2)} MB`;
  }

  return round ? `${Math.round(bytes / 1024 ** 3)} GB` : `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}
