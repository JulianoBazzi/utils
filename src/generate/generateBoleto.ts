import { formatWithPattern } from '../formatting/formatWithPattern.js';
import { getRandomInt } from '../number/getRandomInt.js';
import { boletoMod10, boletoMod11 } from '../validation/internal/boletoDigits.js';
import { randomDigits } from './internal/randomDigits.js';

export interface GenerateBoletoOptions {
  /** `bank` = bank slip (47 digits, default); `collection` = arrecadação (48 digits). */
  type?: 'bank' | 'collection';
  /** Return the line with its usual separators. Defaults to `false`. */
  formatted?: boolean;
}

const BANK_MASK = '#####.##### #####.###### #####.###### # ##############';
const COLLECTION_MASK = '###########-# ###########-# ###########-# ###########-#';

// Bank slip: bank + currency, a 25-digit free field split across three line
// fields (each with its own mod-10 digit), the general mod-11 digit, then due
// factor + amount.
function generateBankSlip(): string {
  const bankAndCurrency = `${randomDigits(3)}9`;
  const freeField = randomDigits(25);
  const dueFactorAndAmount = randomDigits(14);

  const field1 = `${bankAndCurrency}${freeField.slice(0, 5)}`;
  const field2 = freeField.slice(5, 15);
  const field3 = freeField.slice(15, 25);

  // The barcode the validator reassembles to check the general digit.
  const barcode = `${bankAndCurrency}${dueFactorAndAmount}${freeField}`;

  return [
    field1,
    boletoMod10(field1),
    field2,
    boletoMod10(field2),
    field3,
    boletoMod10(field3),
    boletoMod11(barcode),
    dueFactorAndAmount,
  ].join('');
}

// Collection slip: 44-digit barcode starting with `8`, split into four 11-digit
// blocks, each followed by its check digit. The currency digit picks mod-10
// (6/7) or mod-11 (8/9).
function generateCollectionSlip(): string {
  const currency = getRandomInt(6, 9);
  const barcode = `8${randomDigits(1)}${currency}${randomDigits(41)}`;
  const useMod10 = currency === 6 || currency === 7;

  let line = '';
  for (let block = 0; block < 4; block += 1) {
    const chunk = barcode.slice(block * 11, block * 11 + 11);
    line += `${chunk}${useMod10 ? boletoMod10(chunk) : boletoMod11(chunk, 'collection')}`;
  }

  return line;
}

/**
 * Generate a random, valid boleto digitable line — handy for tests and seeds.
 * Passes {@link isValidBoleto} in both plain and formatted form.
 *
 * @example
 * generateBoleto() // e.g. "00190500954014481606906809350314337370000000100"
 * generateBoleto({ formatted: true }) // e.g. "00190.50095 40144.816069 06809.350314 3 37370000000100"
 * generateBoleto({ type: 'collection' }) // e.g. "846700000005 3 ..." (48 digits)
 */
export function generateBoleto(options: GenerateBoletoOptions = {}): string {
  const { type = 'bank', formatted = false } = options;

  const isCollection = type === 'collection';
  const line = isCollection ? generateCollectionSlip() : generateBankSlip();

  if (!formatted) {
    return line;
  }

  return formatWithPattern(line, isCollection ? COLLECTION_MASK : BANK_MASK);
}
