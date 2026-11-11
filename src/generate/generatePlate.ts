import { formatPlate } from '../formatting/formatPlate.js';
import { getRandomInt } from '../number/getRandomInt.js';

export interface GeneratePlateOptions {
  /** Generate a Mercosul plate (`AAA9A99`). Defaults to `true`; `false` → legacy `AAA9999`. */
  mercosul?: boolean;
  /** Return the plate formatted (legacy gets the `AAA-9999` separator). Defaults to `false`. */
  formatted?: boolean;
}

const randomLetter = () => String.fromCharCode(getRandomInt(65, 90));
const randomDigit = () => String(getRandomInt(0, 9));

/**
 * Generate a random, valid Brazilian license plate — handy for tests and
 * seeds.
 *
 * @example
 * generatePlate() // e.g. "ABC1D23" (Mercosul)
 * generatePlate({ mercosul: false, formatted: true }) // e.g. "ABC-1234"
 */
export function generatePlate(options: GeneratePlateOptions = {}): string {
  const { mercosul = true, formatted = false } = options;

  const letters = `${randomLetter()}${randomLetter()}${randomLetter()}`;
  const plate = mercosul
    ? `${letters}${randomDigit()}${randomLetter()}${randomDigit()}${randomDigit()}`
    : `${letters}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`;

  return formatted ? formatPlate(plate) : plate;
}
