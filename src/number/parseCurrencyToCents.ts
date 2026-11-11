import { toCents } from './toCents.js';

const count = (value: string, char: string) => value.split(char).length - 1;

// Which of "," and "." is the decimal separator, if any.
function decimalSeparator(digits: string): ',' | '.' | null {
  const lastComma = digits.lastIndexOf(',');
  const lastDot = digits.lastIndexOf('.');

  if (lastComma >= 0 && lastDot >= 0) {
    return lastComma > lastDot ? ',' : '.';
  }
  const separator = lastComma >= 0 ? ',' : lastDot >= 0 ? '.' : null;
  if (!separator || count(digits, separator) > 1) {
    return null;
  }
  // A single separator followed by exactly three digits reads as thousands
  // ("1.500" → 1500); anything else is decimal ("1.5", "1,50").
  const decimals = digits.length - digits.lastIndexOf(separator) - 1;
  return decimals === 3 ? null : separator;
}

/**
 * Parse a currency string into integer cents. Handles the `R$` symbol and
 * detects the decimal separator: with both `.` and `,` the last one is
 * decimal; a lone separator followed by exactly three digits is a thousands
 * separator. Invalid/missing input → `0`.
 *
 * @example
 * parseCurrencyToCents("R$ 19,90") // 1990
 * parseCurrencyToCents("R$ 1.234,56") // 123456
 * parseCurrencyToCents("1,234.56") // 123456
 * parseCurrencyToCents("1.5") // 150
 * parseCurrencyToCents("1.500") // 150000
 */
export function parseCurrencyToCents(value?: string | null): number {
  if (!value) {
    return 0;
  }

  const cleaned = value.replace(/[^\d,.-]/g, '');
  const negative = cleaned.includes('-');
  const digits = cleaned.replace(/-/g, '');
  const separator = decimalSeparator(digits);

  const normalized = separator
    ? `${digits.slice(0, digits.lastIndexOf(separator)).replace(/[.,]/g, '')}.${digits.slice(digits.lastIndexOf(separator) + 1)}`
    : digits.replace(/[.,]/g, '');
  const amount = Number.parseFloat(normalized);

  if (Number.isNaN(amount)) {
    return 0;
  }
  return toCents(negative ? -amount : amount);
}
