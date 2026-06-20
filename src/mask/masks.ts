/**
 * Input mask patterns (react-input-mask convention: `9` = digit,
 * `*` = alphanumeric). Centralized so the `*InputMask` components don't repeat
 * the literal strings.
 */

/** CPF mask, e.g. `123.456.789-09`. */
export const CPF_MASK = '999.999.999-99';

/** Numeric CNPJ mask, e.g. `12.345.678/0001-95`. */
export const CNPJ_MASK = '99.999.999/9999-99';

/** Alphanumeric CNPJ mask (digits or letters), e.g. `12.ABC.345/01DE-35`. */
export const CNPJ_ALPHANUMERIC_MASK = '**.***.***/****-99';

/** Landline phone mask (10 digits), e.g. `(11) 3456-7890`. */
export const PHONE_MASK = '(99) 9999-9999';

/** Mobile phone mask (11 digits), e.g. `(11) 98765-4321`. */
export const CELLPHONE_MASK = '(99) 99999-9999';

/** Brazilian postal code (CEP) mask, e.g. `12345-678`. */
export const POSTAL_CODE_MASK = '99999-999';
