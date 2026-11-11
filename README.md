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

- `formatDate(value?, { simplified?, fallback? })` — `DD/MM/YY` (or `DD/MM/YYYY`); invalid dates → `fallback`
- `formatDateTime(date?, { simplified?, showSeconds?, fallback? })` — `DD/MM/YY HH:mm` (optional 4-digit year and/or `:ss`); invalid dates → `fallback`
- `formatMonth(value?, { fallback? })` — `MM/YYYY`; invalid dates → `fallback`
- `getMonthName(value?, { short?, fallback?, casing? })` — PT-BR month name, e.g. `Julho` / `Jul`
- `getWeekDayName(value?, { short?, fallback?, casing? })` — PT-BR weekday name, e.g. `Sábado` / `Sáb`
- `formatHour(value?, { simplified?, fallback? })` — `HH:mm` (or `HH:mm:ss`); invalid dates → `fallback`
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — human-readable duration, e.g. `1h e 30 min` (rounded to whole minutes/seconds first; negatives treated as positive)
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — same, from seconds (≥60s rounded to minutes)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated** alias of `formatMinutesToDuration`
- `formatCurrency(value?, divisor = 100, { fallback? })` — BRL currency, e.g. `R$ 19,90`
- `formatCompactNumber(value?, { decimals?, fallback? })` — compact notation (EN), e.g. `1.5M`, `100K`
- `formatPercentage(value?, round = false, { fallback? })` — percentage, e.g. `12,50%`
- `formatBoolean(value?, { casing? })` — `Sim` / `Não` (PT-BR yes/no)
- `formatPhone(phone?, { fallback? })` — BR phone mask (10 or 11 digits)
- `formatBytes(bytes?, round = false, { casing? })` — human-readable size, e.g. `1.50 KB`
- `formatSecondsToTime(value?, showSeconds = true)` — `HH:mm:ss` (or `HH:mm`); pure arithmetic, hours keep counting past 24 (`90000` → `25:00:00`)
- `formatTimeAgo(date?, { fallback?, casing? })` — elapsed time in PT-BR, e.g. `5 dias`; invalid dates → `fallback`, future dates → `1 minuto`
- `formatAddress(address, { fallback? })` — builds a single-line address
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"City - UF"` (empty when both missing)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat? })` — date + abbreviated weekday, e.g. `15/6 - Sáb` (`dateFormat` default `D/M`); invalid dates → `fallback`
- `getAge(birthDate?)` — age in full years (today); missing/invalid/future → `0`
- `formatAge(birthDate?, { fallback? })` — age as PT-BR text, e.g. `"36 anos"` / `"1 ano"`
- `formatCPF(value?, { fallback? })` — `000.000.000-00` (pads with zeros; > 11 digits → plain digits)
- `formatCNPJ(value?, { fallback? })` — `00.000.000/0000-00` (supports alphanumeric CNPJ)
- `formatDocument(value?, { fallback? })` — formats as CPF or CNPJ based on length
- `formatPostalCode(value?, { fallback? })` — BR postal code (CEP) `00000-000` (> 8 digits → plain digits)
- `formatPlate(value?, { fallback? })` — BR license plate: legacy → `ABC-1234`, Mercosul keeps `ABC1D23`
- `formatPIS(value?, { fallback? })` — PIS/PASEP `000.00000.00-0` (> 11 digits → plain digits)
- `formatLongDate(value?, { fallback?, casing? })` — date in full PT-BR, e.g. `1º de julho de 2026`
- `numberToWords(value?, { fallback? })` — integer spelled in PT-BR up to the trillions, e.g. `mil duzentos e trinta e quatro`
- `currencyToWords(value?, divisor = 100, { fallback? })` — BRL amount spelled in PT-BR (mirrors `formatCurrency`), e.g. `dezenove reais e noventa centavos`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — joins two texts (each trimmed), e.g. `"a; b"`
- `applyCasing(value, casing?)` — `lowercase` / `uppercase` / `titlecase` (titlecase keeps the rest of each word, so `"KB"` survives)
- `removeAccents(value?)` — strips accents, e.g. `João` → `Joao`
- `onlyNumbers(value?)` — removes everything that is not a digit
- `onlyAlphanumeric(value?)` — removes non-alphanumerics + uppercase (`"12.abc"` → `"12ABC"`)
- `formatWithPattern(value?, pattern?)` — char-agnostic mask (`#` = next char), e.g. `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`
- `truncate(value?, length = 40)` — trims text and appends `...`
- `getLastCharacter(value?)` — last character of a string
- `abbreviateName(name?, { casing? })` — `"John Smith"` → `"John S."` (titlecase normalizes: `"JOAO SILVA"` → `"Joao S."`; blank input → `""`)
- `getFirstAndLastWord(value?, { fallback?, casing? })` — keeps only the first and last word: `"Analista de Sistemas"` → `"Analista Sistemas"`
- `joinByKey(values, key, dividerOrOptions?)` — joins one property from each object, skipping empty values; 3rd arg is a divider string or `{ divider?, sort?, unique? }`, where `sort` (`true | "asc" | "desc"`) orders by `key` first and `unique` drops duplicates
- `maskSecret(value?, { visibleStart = 5, visibleEnd = 5, mask = '••••••' })` — partially masks a secret, keeping the ends visible, e.g. `$2y$1••••••lMnOp` (short values → mask only; `visibleStart`/`visibleEnd` are clamped to ≥ 0, so `0` hides that side entirely)
- `slugify(value?)` — URL-safe slug (accent-free, lowercase, hyphenated), e.g. `"São Paulo"` → `sao-paulo`
- `sanitizeSpreadsheetCell(value?)` — guards CSV/Excel formula injection: prefixes `'` when the value starts with `= + - @` (tab/CR)
- `buildWhatsAppUrl(phone?, message?, { countryCode = '55', fallback? })` — `wa.me` link; `countryCode` accepts `null` to omit, e.g. `https://wa.me/5511987654321?text=...`
- `buildPhoneUrl(phone?, { countryCode = '55', fallback? })` — `tel:` link, e.g. `tel:+5511987654321` (`countryCode: null` → `tel:11987654321`)
- `buildEmailUrl(email?, { subject?, body?, fallback? })` — `mailto:` link with optional encoded `subject`/`body`; the address is URL-encoded too (no header injection via `?`/`&`)
- `buildInstagramUrl(username?, { fallback? })` — `https://instagram.com/<handle>` (strips a leading `@`; handle is URL-encoded)
- `buildFacebookUrl(username?, { fallback? })` — `https://facebook.com/<handle>` (strips a leading `@`; handle is URL-encoded)
- `buildLinkedInUrl(handle?, { type = 'profile', fallback? })` — `https://linkedin.com/in/...` or `/company/...` (via `type`; handle is URL-encoded)
- `formatEnvironment(value?)` — normalizes a `NODE_ENV` string to `production | homologation | development | test` (unknown → `production`)

### date

Date-window helpers for filters and pickers. All dates in/out use `YYYY-MM-DD`; ranges are inclusive on both ends.

- `getDateRange(days, { reference?, offset? })` — window of `days` days ending at `reference` (default today), e.g. `getDateRange(7)` → last 7 days; `offset` shifts it back (`{ offset: 1 }` ends yesterday)
- `getMonthRange(month, { reference? })` — full range of a `YYYY-MM` month; an ongoing month is clamped to `reference` instead of a future last day
- `getMonthOptions({ count = 12, reference?, min? })` — month picker list, newest first, as `{ id: 'YYYY-MM', name: 'Julho/2026' }` (works with `findOptionById` / `getLabelById`); `min` drops earlier months

### url

- `buildQueryParams(params?, { ignore?, prefix? })` — serializes an object into a query string; skips `null`/`undefined`, expands arrays into repeated keys, returns `""` when empty, e.g. `{ id: [1, 2] }` → `?id=1&id=2`
- `parseQueryParams(value?)` — the inverse; repeated keys become arrays (which `Object.fromEntries(new URLSearchParams(...))` loses). Accepts the string with or without a leading `?`; prototype keys (`__proto__`, `constructor`, `prototype`) are skipped

### mask (constants)

Input mask patterns (react-input-mask convention: `9` = digit, `a` = letter, `*` = alphanumeric).

- `CPF_MASK` — `999.999.999-99`
- `CNPJ_MASK` — `99.999.999/9999-99`
- `CNPJ_ALPHANUMERIC_MASK` — `**.***.***/****-99`
- `PHONE_MASK` — `(99) 9999-9999` (landline)
- `CELLPHONE_MASK` — `(99) 99999-9999` (mobile)
- `POSTAL_CODE_MASK` — `99999-999` (CEP)
- `PLATE_MASK` — `aaa-9*99` (license plate; the `*` slot covers legacy and Mercosul)
- `PIS_MASK` — `999.99999.99-9` (PIS/PASEP)

### validation

- `contains(value, items)` — `true` if `value` is in `items`
- `isOdd(value)` — `true` for odd numbers (handles negatives)
- `isValidJson(value?)` — `true` if the string is valid JSON
- `isValidBarcode(value)` — `true` for a valid EAN/GTIN check digit
- `isValidUrl(value)` — `true` for a valid `http`/`https` URL
- `isDateString(value?)` — `true` for an ISO date `YYYY-MM-DD` (no time)
- `isDateTimeString(value?)` — `true` for a date-time (`T` or space separator, `HH:mm[:ss]`)
- `isValidPhone(value?)` — `true` for a valid BR phone (landline or mobile)
- `isBirthday(value?)` — `true` if the date falls on today's day/month
- `isWeekend(value?)` — `true` if the date falls on a weekend (Saturday or Sunday)
- `isWeekday(value?)` — `true` if the date falls on a weekday (Monday to Friday)
- `isSunday(value?)`, `isMonday(value?)`, `isTuesday(value?)`, `isWednesday(value?)`, `isThursday(value?)`, `isFriday(value?)`, `isSaturday(value?)` — `true` if the date falls on that day of the week (accepts ISO string or `Date`)
- `isValidCPF(value?)` — `true` for a CPF with valid check digits
- `isValidCNPJ(value?)` — `true` for a valid CNPJ (numeric or alphanumeric)
- `isValidDocument(value?)` — validates as CPF or CNPJ based on length
- `isValidPostalCode(value?)` — `true` for an 8-digit CEP
- `isValidEmail(value?)` — `true` for a valid email (TLDs of 2–63 letters)
- `isValidUF(value?)` — `true` for a valid BR state abbreviation (case-insensitive)
- `isValidPlate(value?)` — `true` for a BR license plate (legacy `AAA9999` or Mercosul `AAA9A99`)
- `isValidPIS(value?)` — `true` for a PIS/PASEP with a valid check digit
- `isValidRenavam(value?)` — `true` for a valid RENAVAM (11 digits or legacy 9–10)
- `isValidCNH(value?)` — `true` for a CNH with valid check digits (Denatran algorithm)
- `isValidVoterId(value?)` — `true` for a valid voter registration number (título de eleitor)
- `isValidBoleto(value?)` — `true` for a valid boleto digitable line (bank slip or collection)

### number

- `precisionRound(value?, precision = 2)` — rounds to N decimal places without float surprises (`1.005` → `1.01`)
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
- `maskFields(value, fields, { mask? })` — deep-clones a value, masking the string fields listed at any depth (defaults to `maskSecret`)
- `isEqualIgnoringKeys(a, b, keys)` — structural comparison ignoring `keys` at any depth (key order irrelevant, array order significant)
- `swapAtIndex(list, index, offset)` — swaps two items immutably; out of bounds returns the same reference
- `updateAtIndex(list, index, updater)` — copy of `list` with only the item at `index` replaced

### parse

- `parseIds(...ids)` — comma-separated id strings → `number[]` (trimmed; empty and non-integer entries dropped, so `"1,,2"` → `[1, 2]`)
- `resolveIdsToObjects(ids?, resolver, params?)` — resolves an id list into objects via an async resolver (in parallel)
- `resolveList(value?, resolver, params?)` — `parseIds` + `resolveIdsToObjects`; accepts a string or string array
- `resolveId(value?, resolver, params?)` — resolves the first valid id into an object, or `null`
- `parseJson<T>(value?)` — `JSON.parse` returning `undefined` instead of throwing (a parsed `"null"` stays `null`)
- `toStringArray(value)` — narrows an unknown value to `string[]`, dropping entries of other types; non-arrays → `[]`
- `getFileExtension(value?)` — extension of a path/URL without the dot; ignores `?query`/`#hash` and dotted hosts, dotfiles → `""`
- `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — WhatsApp-style `*bold*`/`_italic_` (nestable) → `{ text, bold?, italic? }[]`

### transform

- `diffLines(before?, after?)` — line diff (longest common subsequence) returning `{ beforeLines, afterLines }`, each line flagged `changed`
- `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — plain text without the `*`/`_` markers, ready for `truncate`, meta tags or e-mail

The rest are dependency-free transforms with the `(value, originalValue) => string` shape (matches `yup.transform`); they wrap the base helpers.

- `onlyNumbersTransform(_value, originalValue)` — wraps `onlyNumbers`, e.g. `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — wraps `onlyAlphanumeric`, e.g. `yup.string().transform(onlyAlphanumericTransform)`

### generate (test/seed helpers)

Every generator produces random values that pass the matching validator. They are backed by `Math.random` and meant for tests and seeds — **except `generateOTP`**, which draws from the Web Crypto API and is safe for production use.

- `generateOTP({ length? })` — numeric one-time password (default 6 digits), leading zeros preserved; cryptographically secure, works in Node and the browser
- `generateCPF({ formatted? })` — valid CPF; `formatted: true` → `000.000.000-00`
- `generateCNPJ({ formatted?, alphanumeric? })` — valid CNPJ (branch `0001`); `alphanumeric: true` → 2026 format
- `generatePIS({ formatted? })` — valid PIS/PASEP; `formatted: true` → `000.00000.00-0`
- `generateRenavam({ legacy? })` — valid RENAVAM; `legacy: true` → old 9-digit format
- `generateCNH()` — valid CNH (Denatran algorithm)
- `generateVoterId()` — valid voter registration number (random state code 01–28)
- `generatePlate({ mercosul?, formatted? })` — valid plate; Mercosul by default, `mercosul: false` → legacy
- `generateBarcode({ length? })` — valid EAN/GTIN barcode (8/12/13/14 digits, default EAN-13)
- `generateBoleto({ type?, formatted? })` — valid boleto digitable line; `bank` by default (47 digits), `type: 'collection'` → arrecadação (48 digits)
- `generatePhone({ mobile?, formatted? })` — valid BR phone; mobile by default, `mobile: false` → landline
- `generatePostalCode({ formatted? })` — 8-digit CEP; `formatted: true` → `00000-000`
- `generateUF()` — random state code from the 27 federative units, e.g. `SP`
- `generateEmail({ domain?, length? })` — valid email; defaults to the RFC 2606 reserved `example.com`, which never routes

### browser (DOM only)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>`
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (width > height)
- `isNotificationsSupported()` — checks web push support (`false` during SSR)
- `openInNewTab(url?, { target?, features? })` — `window.open` with `noopener,noreferrer` always applied (`null` during SSR or when blocked)
- `downloadBlob(blob, fileName)` — triggers a file download and revokes the object URL
- `downloadJson(data, fileName, { space? })` — serializes to JSON and downloads it (indented by default)

## Scripts

| Script               | Description                                         |
| -------------------- | --------------------------------------------------- |
| `npm run build`      | Bundles into `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev`        | Build in watch mode                                 |
| `npm run test`       | Runs the tests once (Vitest)                        |
| `npm run test:watch` | Runs the tests in watch mode                        |
| `npm run test:coverage` | Runs the tests with coverage (thresholds enforced) |
| `npm run typecheck`  | Type-checks with `tsc --noEmit`                     |
| `npm run check:exports` | Checks the ESM/CJS type entries with `attw` (run after `build`) |
| `npm run lint`       | Lint + format check (Biome)                         |
| `npm run lint:fix`   | Applies safe lint/format fixes                      |

## Adding a utility

1. Create `src/<group>/<name>.ts` with a named export (`export function <name>`).
2. Add `src/<group>/<name>.test.ts` with Vitest tests.
3. Re-export it from the group barrel `src/<group>/index.ts`.
4. New group? Create `src/<group>/index.ts` and include it in `src/index.ts`.

## License

MIT © Juliano Bazzi
