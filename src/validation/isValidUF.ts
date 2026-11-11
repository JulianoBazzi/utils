import { UFS } from './internal/ufs.js';

/** One of the 27 Brazilian federative units (`"AC"` … `"TO"`). */
export type { UF } from './internal/ufs.js';

const VALID = new Set<string>(UFS);

/**
 * Check whether a string is a valid Brazilian state code (UF), e.g. `"SP"`.
 * Case-insensitive. Returns `false` for missing input.
 *
 * @example
 * isValidUF("SP") // true
 * isValidUF("XX") // false
 */
export function isValidUF(value?: string | null): boolean {
  if (!value) return false;
  return VALID.has(value.toUpperCase());
}
