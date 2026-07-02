import { onlyNumbers } from '../formatting/onlyNumbers.js';
import { boletoMod10, boletoMod11 } from './internal/boletoDigits.js';

// Bank slip digitable line (47 digits): three mod-10 field digits plus the
// general mod-11 digit of the reassembled 44-position barcode.
function isValidBankSlipLine(line: string): boolean {
  const field1 = line.slice(0, 9);
  const field2 = line.slice(10, 20);
  const field3 = line.slice(21, 31);

  if (
    boletoMod10(field1) !== Number(line[9]) ||
    boletoMod10(field2) !== Number(line[20]) ||
    boletoMod10(field3) !== Number(line[31])
  ) {
    return false;
  }

  // Barcode without its DV (position 4): bank+currency, due factor+amount,
  // then the free field spread across the three line fields.
  const barcode = `${line.slice(0, 4)}${line.slice(33)}${line.slice(4, 9)}${field2}${field3}`;

  return boletoMod11(barcode) === Number(line[32]);
}

// Collection slip (arrecadação, 48 digits): four blocks of 11 digits + DV,
// checked by mod-10 or mod-11 according to the currency digit.
function isValidCollectionLine(line: string): boolean {
  const currencyDigit = Number(line[2]);
  if (currencyDigit < 6 || currencyDigit > 9) {
    return false;
  }

  const useMod10 = currencyDigit === 6 || currencyDigit === 7;

  for (let block = 0; block < 4; block += 1) {
    const start = block * 12;
    const digits = line.slice(start, start + 11);
    const dv = Number(line[start + 11]);
    const expected = useMod10 ? boletoMod10(digits) : boletoMod11(digits, 'collection');

    if (expected !== dv) {
      return false;
    }
  }

  return true;
}

/**
 * Validate a boleto digitable line: bank slips (47 digits, mod-10 field
 * digits + general mod-11 digit) and collection slips (48 digits starting
 * with `8`, block digits by mod-10/mod-11 per the currency digit).
 *
 * @example
 * isValidBoleto("00190.50095 40144.816069 06809.350314 3 37370000000100") // true
 * isValidBoleto("123") // false
 */
export function isValidBoleto(value?: string | null): boolean {
  const line = onlyNumbers(value);

  if (line.length === 47) {
    return isValidBankSlipLine(line);
  }

  if (line.length === 48 && line[0] === '8') {
    return isValidCollectionLine(line);
  }

  return false;
}
