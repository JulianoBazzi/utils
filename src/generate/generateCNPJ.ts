import { formatCNPJ } from '../formatting/formatCNPJ.js';
import { getRandomInt } from '../number/getRandomInt.js';
import { checkDigit } from '../validation/internal/checkDigit.js';
import { randomDigits } from './internal/randomDigits.js';

const ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface GenerateCNPJOptions {
  /** Return the CNPJ masked as `00.000.000/0000-00`. Defaults to `false`. */
  formatted?: boolean;
  /** Generate the new (2026) alphanumeric format. Defaults to `false`. */
  alphanumeric?: boolean;
}

/**
 * Generate a random, valid CNPJ (head office, branch `0001`) — handy for
 * tests and database seeds. Supports the new (2026) alphanumeric format.
 *
 * @example
 * generateCNPJ() // e.g. "11222333000181"
 * generateCNPJ({ formatted: true }) // e.g. "11.222.333/0001-81"
 * generateCNPJ({ alphanumeric: true }) // e.g. "12ABC34501DE35"
 */
export function generateCNPJ(options: GenerateCNPJOptions = {}): string {
  const { formatted = false, alphanumeric = false } = options;

  const root = alphanumeric
    ? Array.from({ length: 8 }, () => ALPHANUMERIC.charAt(getRandomInt(0, 35))).join('')
    : randomDigits(8);
  const base = `${root}0001`;

  const dv1 = checkDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = checkDigit(`${base}${dv1}`, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const cnpj = `${base}${dv1}${dv2}`;

  return formatted ? formatCNPJ(cnpj) : cnpj;
}
