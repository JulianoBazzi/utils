import { getRandomInt } from '../number/getRandomInt.js';
import { type UF, UFS } from '../validation/internal/ufs.js';

/**
 * Return a random Brazilian state code (UF) — handy for tests and seeds.
 * Draws from all 27 federative units (26 states + the Federal District).
 *
 * @example
 * generateUF() // e.g. "SP"
 */
export function generateUF(): UF {
  // getRandomInt is inclusive on both ends, so the index is always in range.
  return UFS[getRandomInt(0, UFS.length - 1)] as UF;
}
