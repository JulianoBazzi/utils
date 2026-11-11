import { roundTo, shift } from '../number/internal/round.js';
import { pluralForm } from './internal/pluralize.js';
import { resolveOptions } from './internal/resolveOptions.js';
import { numberToWords } from './numberToWords.js';

export interface CurrencyToWordsOptions {
  /** The value is divided by this first (cents by default). Defaults to `100`. */
  divisor?: number;
  /** Returned for missing/invalid input. Defaults to `""`. */
  fallback?: string;
}

/**
 * Spell a BRL amount in Brazilian Portuguese. Mirrors `formatCurrency`: the
 * value is divided by `divisor` first, so cents stored as integers work out
 * of the box (`currencyToWords(1990)` → `"dezenove reais e noventa centavos"`).
 * Pass `{ divisor: 1 }` for plain decimal amounts. Cents are rounded exactly
 * (`1.005` → "um real e um centavo").
 *
 * @example
 * currencyToWords(123456) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 * currencyToWords(1234.56, { divisor: 1 }) // same as above
 * currencyToWords(100000000) // "um milhão de reais"
 */
export function currencyToWords(value?: number | null, options?: CurrencyToWordsOptions): string;
/** Positional form `(value, divisor, { fallback })`, kept for compatibility (legacy, removed in 2.0). */
export function currencyToWords(
  value?: number | null,
  divisor?: number,
  options?: Pick<CurrencyToWordsOptions, 'fallback'>,
): string;
export function currencyToWords(
  value?: number | null,
  divisorOrOptions?: number | CurrencyToWordsOptions,
  options: Pick<CurrencyToWordsOptions, 'fallback'> = {},
): string {
  const { divisor = 100, fallback = '' } = resolveOptions<CurrencyToWordsOptions, 'divisor'>(
    divisorOrOptions,
    'divisor',
    options,
  );

  if (value === null || value === undefined || !Number.isFinite(value) || !divisor) {
    return fallback;
  }

  const totalCents = shift(roundTo(value / divisor, 2), 2);
  if (totalCents === 0) return 'zero reais';

  const reais = Math.floor(Math.abs(totalCents) / 100);
  const cents = Math.abs(totalCents) % 100;
  const parts: string[] = [];

  if (reais > 0) {
    const reaisWords = numberToWords(reais);
    if (!reaisWords) return fallback;

    // Round millions and above read as "de reais" ("um milhão de reais").
    const connector = reais >= 1e6 && reais % 1e6 === 0 ? ' de ' : ' ';
    parts.push(`${reaisWords}${connector}${pluralForm(reais, 'real', 'reais')}`);
  }

  if (cents > 0) {
    parts.push(`${numberToWords(cents)} ${pluralForm(cents, 'centavo', 'centavos')}`);
  }

  const result = parts.join(' e ');
  return totalCents < 0 ? `menos ${result}` : result;
}
