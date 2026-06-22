# @julianobazzi/utils

<a href="https://www.npmjs.com/package/@julianobazzi/utils">
  <img alt="npm version" src="https://img.shields.io/npm/v/@julianobazzi/utils?color=01579b&style=for-the-badge&logo=npm">
</a>
<a href="https://www.npmjs.com/package/@julianobazzi/utils">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/@julianobazzi/utils?color=01579b&style=for-the-badge">
</a>
<a href="https://github.com/JulianoBazzi">
  <img alt="Author Juliano Bazzi" src="https://img.shields.io/badge/author-Juliano%20Bazzi-%23ffb84d?color=01579b&style=for-the-badge">
</a>
<a href="https://github.com/julianobazzi/utils/blob/master/LICENSE">
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-%2304D361?color=01579b&style=for-the-badge">
</a>

**English** | [Português](README.pt-BR.md)

A collection of small, tree-shakeable TypeScript utility functions. Shipped as ESM + CJS with type definitions included.

> Some helpers are tailored to Brazil (CPF, CNPJ, CEP, BR phone masks, PT-BR formatting), while the rest are locale-agnostic.

## Installation

```bash
npm install @julianobazzi/utils
```

## Usage

```ts
import { formatDate, contains, omitFields } from "@julianobazzi/utils";

formatDate("2024-01-02"); // "02/01/24"
contains("a", ["a", "b"]); // true
omitFields({ a: 1, b: 2 }, ["b"]); // { a: 1 }
```

CommonJS:

```js
const { onlyNumbers } = require("@julianobazzi/utils");

onlyNumbers("(11) 98765-4321"); // "11987654321"
```

## API

All functions are exported flat from the package root, grouped internally by purpose.

### formatting

- `formatDate(value?, { simplified?, fallback? })` — `DD/MM/YY` (or `DD/MM/YYYY`)
- `formatDateTime(date?, { simplified?, showSeconds?, fallback? })` — `DD/MM/YY HH:mm` (optional 4-digit year and/or `:ss`)
- `formatMonth(value?, { fallback? })` — `MM/YYYY`
- `formatHour(value?, { simplified?, fallback? })` — `HH:mm` (or `HH:mm:ss`)
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — human-readable duration, e.g. `1h e 30 min`
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — same, from seconds (≥60s rounded to minutes)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated** alias of `formatMinutesToDuration`
- `formatCurrency(value?, divisor = 100, { fallback? })` — BRL currency, e.g. `R$ 19,90`
- `formatCompactNumber(value?, { decimals?, fallback? })` — compact notation (EN), e.g. `1.5M`, `100K`
- `formatPercentage(value?, round = false, { fallback? })` — percentage, e.g. `12,50%`
- `formatBoolean(value?, { casing? })` — `Sim` / `Não` (PT-BR yes/no)
- `formatPhone(phone?, { fallback? })` — BR phone mask (10 or 11 digits)
- `formatBytes(bytes?, round = false, { casing? })` — human-readable size, e.g. `1.50 KB`
- `formatSecondsToTime(value?, showSeconds = true)` — `HH:mm:ss` (or `HH:mm`)
- `formatTimeAgo(date?, { fallback?, casing? })` — elapsed time in PT-BR, e.g. `5 dias`
- `formatAddress(address, { fallback? })` — builds a single-line address
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"City - UF"` (empty when both missing)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat? })` — date + abbreviated weekday, e.g. `15/6 - Sáb` (`dateFormat` default `D/M`)
- `formatCPF(value?, { fallback? })` — `000.000.000-00`
- `formatCNPJ(value?, { fallback? })` — `00.000.000/0000-00` (supports alphanumeric CNPJ)
- `formatDocument(value?, { fallback? })` — formats as CPF or CNPJ based on length
- `formatPostalCode(value?, { fallback? })` — BR postal code (CEP) `00000-000`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — joins two texts (each trimmed), e.g. `"a; b"`
- `applyCasing(value, casing?)` — `lowercase` / `uppercase` / `titlecase` (titlecase keeps the rest of each word, so `"KB"` survives)
- `removeAccents(value?)` — strips accents, e.g. `João` → `Joao`
- `onlyNumbers(value?)` — removes everything that is not a digit
- `onlyAlphanumeric(value?)` — removes non-alphanumerics + uppercase (`"12.abc"` → `"12ABC"`)
- `formatWithPattern(value?, pattern?)` — char-agnostic mask (`#` = next char), e.g. `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`
- `truncate(value?, length = 40)` — trims text and appends `...`
- `getLastCharacter(value?)` — last character of a string
- `abbreviateName(name?, { casing? })` — `"John Smith"` → `"John S."` (titlecase normalizes: `"JOAO SILVA"` → `"Joao S."`)
- `joinByKey(values, key, dividerOrOptions?)` — joins one property from each object; 3rd arg is a divider string or `{ divider?, sort? }`, where `sort` (`true | "asc" | "desc"`) orders by `key` first

### mask (constants)

Input mask patterns (react-input-mask convention: `9` = digit, `*` = alphanumeric).

- `CPF_MASK` — `999.999.999-99`
- `CNPJ_MASK` — `99.999.999/9999-99`
- `CNPJ_ALPHANUMERIC_MASK` — `**.***.***/****-99`
- `PHONE_MASK` — `(99) 9999-9999` (landline)
- `CELLPHONE_MASK` — `(99) 99999-9999` (mobile)
- `POSTAL_CODE_MASK` — `99999-999` (CEP)

### validation

- `contains(value, items)` — `true` if `value` is in `items`
- `isOdd(value)` — `true` for odd numbers (handles negatives)
- `isValidJson(value?)` — `true` if the string is valid JSON
- `isValidBarcode(value)` — `true` for a valid EAN/GTIN check digit
- `isValidUrl(value)` — `true` for a valid `http`/`https` URL
- `isValidPhone(value?)` — `true` for a valid BR phone (landline or mobile)
- `isBirthday(value?)` — `true` if the date falls on today's day/month
- `isValidCPF(value?)` — `true` for a CPF with valid check digits
- `isValidCNPJ(value?)` — `true` for a valid CNPJ (numeric or alphanumeric)
- `isValidDocument(value?)` — validates as CPF or CNPJ based on length
- `isValidPostalCode(value?)` — `true` for an 8-digit CEP
- `isValidEmail(value?)` — `true` for a valid email
- `isValidUF(value?)` — `true` for a valid BR state abbreviation (case-insensitive)

### number

- `precisionRound(value?, precision = 2)` — rounds to N decimal places
- `formatInteger(value?, { fallback? })` — rounds to the nearest integer
- `toPositive(value?)` — clamps to a non-negative value
- `getRandomInt(min = 1, max = 100)` — random integer in range (inclusive)
- `safeDivide(value1, value2?)` — divides; returns 0 when the divisor is ≤ 0 or missing
- `toCents(value?)` — amount → integer cents, e.g. `19.9` → `1990` (inverse of `formatCurrency`)
- `parseCurrencyToCents(value?)` — BRL string → integer cents, e.g. `"R$ 1.234,56"` → `123456`

### object

- `getProperty(obj, key)` — type-safe property access
- `omitFields(obj, keys)` — shallow copy without `keys`
- `getOptionId(option?)` — extracts the `id` from an option/entity
- `getListIds(list?)` — maps a list of entities to their `id`s
- `findOptionById(options?, value?)` — finds the option whose id matches `value` (string compare), or `null`
- `findOptionsByIds(options?, value?)` — maps each id in `value` to its option, dropping non-matches
- `getLabelById(options?, value?, key = "name", fallback = "")` — option's field as a string by id, or `fallback`

### parse

- `parseIds(...ids)` — comma-separated id strings → `number[]`
- `resolveIdsToObjects(ids?, resolver, params?)` — resolves an id list into objects via an async resolver (in parallel)
- `resolveList(value?, resolver, params?)` — `parseIds` + `resolveIdsToObjects`; accepts a string or string array
- `resolveId(value?, resolver, params?)` — resolves the first valid id into an object, or `null`

### transform (yup-compatible)

Dependency-free transforms with the `(value, originalValue) => string` shape (matches `yup.transform`); they wrap the base helpers.

- `onlyNumbersTransform(_value, originalValue)` — wraps `onlyNumbers`, e.g. `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — wraps `onlyAlphanumeric`, e.g. `yup.string().transform(onlyAlphanumericTransform)`

### browser (DOM only)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>`
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (width > height)
- `isNotificationsSupported()` — checks web push support

## Scripts

| Script               | Description                                         |
| -------------------- | --------------------------------------------------- |
| `npm run build`      | Bundles into `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev`        | Build in watch mode                                 |
| `npm run test`       | Runs the tests once (Vitest)                        |
| `npm run test:watch` | Runs the tests in watch mode                        |
| `npm run typecheck`  | Type-checks with `tsc --noEmit`                     |
| `npm run lint`       | Lint + format check (Biome)                         |
| `npm run lint:fix`   | Applies safe lint/format fixes                      |

## Adding a utility

1. Create `src/<group>/<name>.ts` with a named export (`export function <name>`).
2. Add `src/<group>/<name>.test.ts` with Vitest tests.
3. Re-export it from the group barrel `src/<group>/index.ts`.
4. New group? Create `src/<group>/index.ts` and include it in `src/index.ts`.

## License

MIT © Juliano Bazzi
