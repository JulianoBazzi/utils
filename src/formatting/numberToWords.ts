const UNITS = [
  'zero',
  'um',
  'dois',
  'três',
  'quatro',
  'cinco',
  'seis',
  'sete',
  'oito',
  'nove',
  'dez',
  'onze',
  'doze',
  'treze',
  'quatorze',
  'quinze',
  'dezesseis',
  'dezessete',
  'dezoito',
  'dezenove',
];
const TENS = [
  '',
  '',
  'vinte',
  'trinta',
  'quarenta',
  'cinquenta',
  'sessenta',
  'setenta',
  'oitenta',
  'noventa',
];
const HUNDREDS = [
  '',
  'cento',
  'duzentos',
  'trezentos',
  'quatrocentos',
  'quinhentos',
  'seiscentos',
  'setecentos',
  'oitocentos',
  'novecentos',
];
const SCALES = [
  { value: 1e12, singular: 'trilhão', plural: 'trilhões' },
  { value: 1e9, singular: 'bilhão', plural: 'bilhões' },
  { value: 1e6, singular: 'milhão', plural: 'milhões' },
  { value: 1e3, singular: 'mil', plural: 'mil' },
];

// Spell a group of 1..999.
function groupToWords(value: number): string {
  if (value === 100) return 'cem';

  const hundred = Math.floor(value / 100);
  const rest = value % 100;
  const parts: string[] = [];

  if (hundred > 0) parts.push(HUNDREDS[hundred] as string);

  if (rest > 0 && rest < 20) {
    parts.push(UNITS[rest] as string);
  } else if (rest >= 20) {
    const unit = rest % 10;
    const ten = TENS[Math.floor(rest / 10)] as string;
    parts.push(unit > 0 ? `${ten} e ${UNITS[unit]}` : ten);
  }

  return parts.join(' e ');
}

export interface NumberToWordsOptions {
  /** Returned for missing/invalid input. Defaults to `""`. */
  fallback?: string;
}

/**
 * Spell an integer in Brazilian Portuguese, up to the trillions. The decimal
 * part is ignored (see `currencyToWords` for money amounts).
 *
 * @example
 * numberToWords(1234) // "mil duzentos e trinta e quatro"
 * numberToWords(1100) // "mil e cem"
 * numberToWords(-42) // "menos quarenta e dois"
 */
export function numberToWords(value?: number | null, options: NumberToWordsOptions = {}): string {
  const { fallback = '' } = options;

  if (value === null || value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  const integer = Math.trunc(Math.abs(value));
  if (integer >= 1e15) return fallback;
  if (integer === 0) return 'zero';

  const parts: { words: string; count: number }[] = [];
  let remaining = integer;

  for (const scale of SCALES) {
    const count = Math.floor(remaining / scale.value);
    remaining %= scale.value;
    if (count === 0) continue;

    // "mil" is invariable and drops the leading "um".
    const words =
      scale.singular === 'mil'
        ? count === 1
          ? 'mil'
          : `${groupToWords(count)} mil`
        : count === 1
          ? `um ${scale.singular}`
          : `${groupToWords(count)} ${scale.plural}`;

    parts.push({ words, count });
  }

  if (remaining > 0) {
    parts.push({ words: groupToWords(remaining), count: remaining });
  }

  let result = '';
  parts.forEach((part, index) => {
    if (index === 0) {
      result = part.words;
      return;
    }

    // "e" before the last group when it reads as a unit (< 100 or a round hundred).
    const isLast = index === parts.length - 1;
    const connector = isLast && (part.count < 100 || part.count % 100 === 0) ? ' e ' : ' ';
    result += connector + part.words;
  });

  return value < 0 ? `menos ${result}` : result;
}
