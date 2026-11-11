import { digitAt } from './digits.js';

/**
 * Mod-10 check digit (bank slip digitable-line fields and `6`/`7` currency
 * blocks of collection slips). Weights 2,1 alternating from the right;
 * products above 9 add their digits together.
 *
 * @internal
 */
export function boletoMod10(value: string): number {
  let sum = 0;
  let weight = 2;
  for (let i = value.length - 1; i >= 0; i -= 1) {
    const product = digitAt(value, i) * weight;
    sum += product > 9 ? product - 9 : product;
    weight = weight === 2 ? 1 : 2;
  }

  return (10 - (sum % 10)) % 10;
}

/**
 * Mod-11 check digit with weights 2..9 cycling from the right.
 * `bank` mode (general barcode digit): rest 0/1 → 1, otherwise 11 - rest.
 * `collection` mode (FEBRABAN arrecadação blocks): rest 0/1 → 0.
 *
 * @internal
 */
export function boletoMod11(value: string, mode: 'bank' | 'collection' = 'bank'): number {
  let sum = 0;
  let weight = 2;
  for (let i = value.length - 1; i >= 0; i -= 1) {
    sum += digitAt(value, i) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const rest = sum % 11;
  if (rest === 0 || rest === 1) {
    return mode === 'bank' ? 1 : 0;
  }

  return 11 - rest;
}
