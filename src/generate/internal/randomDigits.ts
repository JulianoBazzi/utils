import { getRandomInt } from '../../number/getRandomInt.js';

/**
 * String of `count` random decimal digits (leading zeros allowed).
 *
 * @internal
 */
export function randomDigits(count: number): string {
  return Array.from({ length: count }, () => getRandomInt(0, 9)).join('');
}
