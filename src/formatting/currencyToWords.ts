import { pluralForm } from './internal/pluralize.js';
import { numberToWords } from './numberToWords.js';

interface CurrencyToWordsOptions {
  /** Returned for missing/invalid input. Defaults to `""`. */
  fallback?: string;
}

/**
 * Spell a BRL amount in Brazilian Portuguese. Mirrors `formatCurrency`: the
 * value is divided by `divisor` first, so cents stored as integers work out
 * of the box (`currencyToWords(1990)` → `"dezenove reais e noventa centavos"`).
 * Pass `divisor = 1` for plain decimal amounts.
 *
 * @example
 * currencyToWords(123456) // "mil duzentos e trinta e quatro reais e cinquenta e seis centavos"
 * currencyToWords(1234.56, 1) // same as above
 * currencyToWords(100000000) // "um milhão de reais"
 */
export function currencyToWords(
  value?: number | null,
  divisor = 100,
  options: CurrencyToWordsOptions = {},
): string {
  const { fallback = '' } = options;

  if (value === null || value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  const totalCents = Math.round((value / divisor) * 100);
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
