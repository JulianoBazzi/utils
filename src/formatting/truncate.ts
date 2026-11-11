import { resolveOptions } from './internal/resolveOptions.js';

export interface TruncateOptions {
  /** Characters kept before the suffix (counted by code point). Defaults to `40`. */
  length?: number;
  /** Appended when the text is cut. Defaults to `"..."`. */
  suffix?: string;
}

/**
 * Truncate text to `length` characters and append `suffix` when it was cut, so
 * the output can be up to `length + suffix.length` long. Counts code points,
 * so an emoji is never split in half. Missing input or `length <= 0` → `""`.
 *
 * @example
 * truncate("a long sentence", 6) // "a long..."
 * truncate("a long sentence", { length: 6, suffix: "…" }) // "a long…"
 */
export function truncate(
  value?: string | null,
  lengthOrOptions: number | TruncateOptions = 40,
): string {
  const { length = 40, suffix = '...' } = resolveOptions<TruncateOptions, 'length'>(
    lengthOrOptions,
    'length',
  );
  if (!value || length <= 0) return '';

  const chars = [...value];
  if (chars.length > length) {
    return `${chars.slice(0, length).join('').trim()}${suffix}`;
  }

  return value;
}
