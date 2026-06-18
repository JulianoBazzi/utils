const KB = 1024;
const MB = 1024 ** 2;
const GB = 1024 ** 3;

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

  if (bytes < KB) {
    return `${bytes} Bytes`;
  }

  const format = (size: number, unit: string) =>
    round ? `${Math.round(size)} ${unit}` : `${size.toFixed(2)} ${unit}`;

  if (bytes < MB) {
    return format(bytes / KB, "KB");
  }

  if (bytes < GB) {
    return format(bytes / MB, "MB");
  }

  return format(bytes / GB, "GB");
}
