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

- `formatDate(value?, { year?, simplified?, fallback?, timeZone? })` — `DD/MM/YY`; `year: 'numeric'` → `DD/MM/YYYY`, `year: false` → `DD/MM`; impossible dates (`2024-02-30`) → `fallback`
- `formatDateTime(date?, { year?, seconds?, simplified?, showSeconds?, fallback?, timeZone? })` — `DD/MM/YY HH:mm`; `year` as in `formatDate`, `seconds: true` adds `:ss`; invalid dates → `fallback`
- `formatMonth(value?, { fallback?, timeZone? })` — `MM/YYYY`; invalid dates → `fallback`
- `getMonthName(value?, { short?, fallback?, casing?, timeZone? })` — PT-BR month name, e.g. `Julho` / `Jul`
- `getWeekDayName(value?, { short?, fallback?, casing?, timeZone? })` — PT-BR weekday name, e.g. `Sábado` / `Sáb`
- `formatTime(value?, { seconds?, simplified?, fallback?, timeZone? })` — `HH:mm` (or `HH:mm:ss`); also accepts a bare time (`"13:45:00"`); invalid → `fallback`
- `formatHour(...)` — legacy name of `formatTime` (removed in 2.0)
- `formatDateRange(start?, end?, { separator?, openEnd?, year?, fallback?, timeZone? })` — `01/01/24 a 31/01/24`; same day renders once; missing end → `openEnd` text or `fallback`
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — human-readable duration, e.g. `1h e 30 min` (rounded to whole minutes/seconds first); `0` → `0s`, negatives keep the sign (`-1h e 30 min`)
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — same, from seconds (≥60s rounded to minutes)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated** alias of `formatMinutesToDuration`
- `formatCurrency(value?, { divisor = 100, fallback? })` — BRL currency, e.g. `R$ 19,90`; `0` is formatted, `fallback` only for missing/non-finite input (positional `(value, divisor, { fallback })` still accepted)
- `formatCompactNumber(value?, { decimals?, locale?, fallback? })` — compact notation, e.g. `1.5M`, `100K` (`locale: 'pt-BR'` → `1,5 mil`; default `en` until 2.0)
- `formatPercentage(value?, { round?, decimals?, rounding?, fallback? })` — pt-BR percentage, e.g. `12,50%`, `1.234,50%`; `0` → `0,00%`; `rounding: 'floor'` keeps 99.6 at `99%` (positional `(value, round, { fallback })` still accepted)
- `formatBoolean(value?, { casing?, fallback? })` — `Sim` / `Não` (PT-BR yes/no); `fallback` covers `null`/`undefined`
- `formatPhone(phone?, { fallback? })` — BR phone mask (10 or 11 digits); drops a `+55` country code and a trunk `0`; `0800 123 4567` for non-geographic numbers
- `formatBytes(bytes?, { round?, locale?, casing?, fallback? })` — human-readable size, e.g. `1.50 KB` (`locale: 'pt-BR'` → `1,50 KB`); negatives keep the sign (positional `round` still accepted)
- `formatSecondsToTime(value?, { seconds?, signed?, fallback? })` — `HH:mm:ss` (or `HH:mm`); pure arithmetic, hours keep counting past 24 (`90000` → `25:00:00`); `signed: 'negative'` keeps the minus sign (positional `showSeconds` still accepted)
- `formatTimeAgo(date?, { fallback? })` — elapsed time in PT-BR, e.g. `5 dias`; invalid dates → `fallback`, future dates → `1 minuto`
- `formatAddress(address, { fallback? })` — builds a single-line address (`street, number - district, city - UF, CEP`); missing parts never leave a dangling separator
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"City - UF"`; parts are trimmed (empty when both missing)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat?, timeZone? })` — date + abbreviated weekday, e.g. `15/6 - Sáb` (`dateFormat` default `D/M`); invalid dates → `fallback`
- `getAge(birthDate?, { timeZone? })` — age in full years (today); missing/invalid/future → `0`
- `formatAge(birthDate?, { fallback?, timeZone? })` — age as PT-BR text, e.g. `"36 anos"` / `"1 ano"`
- `formatCPF(value?, { fallback?, pad? })` — `000.000.000-00` (pads with zeros unless `pad: false`; > 11 digits → plain digits)
- `formatCNPJ(value?, { fallback?, pad? })` — `00.000.000/0000-00` (supports alphanumeric CNPJ; `pad: false` leaves incomplete input unmasked)
- `formatDocument(value?, { fallback?, pad? })` — formats as CPF or CNPJ based on length
- `formatPostalCode(value?, { fallback?, pad? })` — BR postal code (CEP) `00000-000` (> 8 digits → plain digits)
- `formatPlate(value?, { fallback? })` — BR license plate: legacy → `ABC-1234`, Mercosul keeps `ABC1D23`
- `formatPIS(value?, { fallback?, pad? })` — PIS/PASEP `000.00000.00-0` (> 11 digits → plain digits)
- `formatLongDate(value?, { fallback?, casing?, timeZone? })` — date in full PT-BR, e.g. `1º de julho de 2026`
- `numberToWords(value?, { fallback? })` — integer spelled in PT-BR up to the trillions, e.g. `mil duzentos e trinta e quatro`
- `currencyToWords(value?, { divisor = 100, fallback? })` — BRL amount spelled in PT-BR (mirrors `formatCurrency`), e.g. `dezenove reais e noventa centavos`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — joins two texts (each trimmed), e.g. `"a; b"`
- `applyCasing(value, casing?, { lowercaseWords? })` — `lowercase` / `uppercase` / `titlecase` (titlecase keeps the rest of each word, so `"KB"` survives; `lowercaseWords: ['de', 'da']` → `"João da Silva"`)
- `removeAccents(value?)` — strips accents, e.g. `João` → `Joao`
- `onlyNumbers(value?)` — removes everything that is not a digit
- `onlyAlphanumeric(value?, { casing? })` — removes accents and non-alphanumerics, then uppercases (`"12.abc"` → `"12ABC"`, `"João"` → `"JOAO"`; `casing: 'none'` keeps the case)
- `formatWithPattern(value?, pattern?, { placeholder?, token? })` — char-agnostic mask (`#` = next char), e.g. `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`; `placeholder: '_'` fills the rest (`(11) 9____-____`)
- `truncate(value?, { length = 40, suffix = '...' })` — cuts to `length` code points and appends `suffix` (positional `length` still accepted)
- `getLastCharacter(value?)` — last character of a string
- `abbreviateName(name?, { casing? })` — first name + last-name initial: `"Maria de Souza"` → `"Maria S."` (titlecase normalizes: `"JOAO SILVA"` → `"Joao S."`; blank input → `""`)
- `getFirstAndLastWord(value?, { fallback?, casing? })` — keeps only the first and last word: `"Analista de Sistemas"` → `"Analista Sistemas"`
- `joinByKey(values, key, dividerOrOptions?)` — joins one property from each object, skipping empty values; 3rd arg is a divider string or `{ divider?, sort?, unique? }`, where `sort` (`true | "asc" | "desc"`) orders by `key` first and `unique` drops duplicates
- `maskSecret(value?, { visibleStart = 5, visibleEnd = 5, mask = '••••••' })` — partially masks a secret, keeping the ends visible, e.g. `$2y$1••••••lMnOp` (short values → mask only; `visibleStart`/`visibleEnd` are clamped to ≥ 0, so `0` hides that side entirely)
- `slugify(value?)` — URL-safe slug (accent-free, lowercase, hyphenated), e.g. `"São Paulo"` → `sao-paulo`
- `pluralize(count?, singular, plural | { plural?, showCount?, formatCount? })` — `0` → `"0 tarefas"`, `1` → `"1 tarefa"`; irregular plurals via the 3rd arg (`"mês"`, `"meses"`); a missing count reads as `0`
- `formatNumber(value?, { decimals?, minDecimals?, locale = 'pt-BR', fallback? })` — locale number, e.g. `1234.5` → `1.234,5`
- `normalizeText(value?, { casing?, collapseWhitespace?, trim?, removeAccents? })` — text for search/comparison: `"  São   Paulo "` → `"sao paulo"`
- `formatList(items?, { limit?, conjunction = 'e', moreLabel?, fallback? })` — `"Ana, Bia e Caio"`; with `limit: 3` → `"a, b, c e mais 2"`
- `formatMilliseconds(ms?, { decimals = 1, showMinutes?, locale = 'pt-BR', fallback? })` — `2345` → `2,3s`; `showMinutes` → `1m 2,3s`
- `formatMailbox({ name?, address? }, { fallback? })` — `"Ana <ana@x.com>"` (one side when the other is missing or equal)
- `buildMapsUrl(address?, { fallback? })` — Google Maps search link for an address
- `sanitizeFileName(value?, { maxLength = 255, fallback?, removeAccents?, replacement = '-' })` — safe file name on every OS (forbidden/control chars, trailing dots, reserved names such as `CON`)
- `sanitizeNumeric(value?, { allowDecimal?, allowNegative? })` — keeps digits (plus the first `.`/`,` and a leading `-` when allowed) for numeric inputs; `"1.2,3"` → `"1.23"`
- `sanitizeSpreadsheetCell(value?)` — guards CSV/Excel formula injection: prefixes `'` when the value starts with `= + - @` (also after leading spaces, or tab/CR); plain negative numbers (`-5`) are kept
- `buildWhatsAppUrl(phone?, message?, { countryCode = '55', fallback? })` — `wa.me` link, e.g. `https://wa.me/5511987654321?text=...`; a country code already in the number is not repeated; `countryCode: null` omits it
- `buildPhoneUrl(phone?, { countryCode = '55', fallback? })` — `tel:` link, e.g. `tel:+5511987654321` (`countryCode: null` → `tel:11987654321`; `0800` numbers never get a country code)
- `buildEmailUrl(email?, { subject?, body?, fallback? })` — `mailto:` link with optional encoded `subject`/`body`; the address is URL-encoded too (no header injection via `?`/`&`)
- `buildInstagramUrl(username?, { fallback? })` — `https://instagram.com/<handle>` (strips a leading `@`; handle is URL-encoded)
- `buildFacebookUrl(username?, { fallback? })` — `https://facebook.com/<handle>` (strips a leading `@`; handle is URL-encoded)
- `buildLinkedInUrl(handle?, { type = 'profile', fallback? })` — `https://linkedin.com/in/...` or `/company/...` (via `type`; handle is URL-encoded)
- `normalizeEnvironment(value?)` — normalizes a `NODE_ENV` string to `production | homologation | development | test` (unknown → `production`)
- `formatEnvironment(...)` — legacy name of `normalizeEnvironment` (removed in 2.0)

All `build*Url` helpers return `string | F`: pass `{ fallback: undefined }` to get `undefined` for a missing value (ready for an `href`).

### date

Date-window helpers for filters and pickers. All dates in/out use `YYYY-MM-DD`; ranges are inclusive on both ends. Unparseable input yields `{ startDate: '', endDate: '' }` (never `"Invalid Date"`).

- `getToday({ timeZone? })` — today as `YYYY-MM-DD`, e.g. the Brazilian date on a UTC server
- `getCurrentMonth({ timeZone? })` — current month as `YYYY-MM`

- `getDateRange(days, { reference?, offset?, timeZone? })` — window of `days` days ending at `reference` (default today), e.g. `getDateRange(7)` → last 7 days; `offset` shifts it back (`{ offset: 1 }` ends yesterday)
- `getMonthRange(month, { reference?, timeZone? })` — full range of a `YYYY-MM` month; an ongoing month is clamped to `reference` instead of a future last day; a future month comes back whole (never inverted)
- `getMonthOptions({ count = 12, reference?, min?, timeZone? })` — month picker list, newest first, as `{ id: 'YYYY-MM', name: 'Julho/2026' }` (works with `findOptionById` / `getLabelById`); `min` drops earlier months
- `normalizeDateRange(range, { min?, max? })` — swaps inverted ends and clamps into `[min, max]`; never returns `startDate > endDate`

#### Time zones

Every date helper accepts `timeZone` (an IANA name such as `"America/Sao_Paulo"`). It is applied only to values that carry an absolute instant — `Date`, epoch numbers, `Dayjs`, and ISO strings with `Z` or an offset — and to "today". Naive strings (`"2024-01-02"`, `"2024-01-02 13:45"`) are wall-clock values and are never shifted. Without `timeZone`, the runtime's zone is used, as before. No dayjs plugin is required; an invalid zone throws a `RangeError` (check with `isValidTimeZone`).

```ts
// Server running in UTC, 02:00 UTC on 2 Jan = 23:00 on 1 Jan in São Paulo
formatDate("2024-01-02T02:00:00Z", { timeZone: "America/Sao_Paulo" }); // "01/01/24"
getToday({ timeZone: "America/Sao_Paulo" }); // "2024-01-01"
formatDate("2024-01-02", { timeZone: "Asia/Tokyo" }); // "02/01/24" (naive: not shifted)
```

### url

- `buildQueryParams(params?, { ignore?, prefix?, skipEmpty? })` — serializes an object into a query string; skips `null`/`undefined` (and `""` with `skipEmpty`), expands arrays into repeated keys, writes `Date` as ISO, returns `""` when empty, e.g. `{ id: [1, 2] }` → `?id=1&id=2`
- `parseQueryParams(value?)` — the inverse; repeated keys become arrays (which `Object.fromEntries(new URLSearchParams(...))` loses). Accepts the string with or without a leading `?`; prototype keys (`__proto__`, `constructor`, `prototype`) are skipped
- `buildQueryUrl(url, params, { ignore?, keepHash = true })` — patches the query of an existing URL: each key replaces all its occurrences; `""`/`null`/`undefined`/`NaN`/invalid dates/empty arrays remove it; `false` and `0` are written; the hash is kept, e.g. `buildQueryUrl("/a?x=1#top", { x: 2 })` → `/a?x=2#top`
- `isSameQuery(a, b, { ignoreValueOrder? })` — compares two queries by content (key order, `+`/`%20` and a leading `?` don't matter)
- `isRouteActive(pathname?, href, { exact? })` — is `href` the active route? Matches by path segment (`/settings` on `/settings/profile`, not on `/settings-old`), ignores query/hash/trailing slash; `/` only matches exactly

Typed readers that never throw — a missing or invalid value comes back `undefined` (or `[]`), so apply defaults with `??`. They accept any query source: `URLSearchParams`, a query string, Pages Router `query` or App Router `searchParams` (`QuerySource`).

- `readQueryString(query, key)` — first non-empty value (`?search=a&search=b` → `"a"`)
- `readQueryArray(query, key)` — every non-empty value
- `readQueryNumber(query, key, { integer?, min?, max? })` — plain decimals only (rejects `1e3`, `0x10`, `Infinity`); out of range → `undefined`
- `readQueryBoolean(query, key)` — `true`/`1` → `true`, `false`/`0` → `false` (`?showAlert=false` is never truthy)
- `readQueryEnum(query, key, allowed)` — the value only when it is in `allowed`
- `readQueryDate(query, key)` — a real `YYYY-MM-DD` date (`2026-02-30` → `undefined`)
- `readQueryIds(query, key, { max? })` — positive integer ids from repeated keys and commas, deduplicated
- `readQueryRange(query, [startKey, endKey], fallback, { min?, max? })` — date range with per-end fallback; swapped when inverted, clamped into `[min, max]`

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

- `contains(value, items?)` — `true` if `value` is in `items` (readonly arrays and `null` accepted)
- `isOdd(value)` — `true` for odd numbers (handles negatives)
- `isValidJson(value?)` — `true` if the string is valid JSON
- `isValidBarcode(value, { lengths? })` — `true` for a valid EAN/GTIN check digit; `lengths` restricts the accepted sizes
- `isValidUrl(value)` — `true` for a valid `http`/`https` URL
- `isSafeUrl(value?, { protocols?, allowRelative = true })` — `true` when the URL is safe for an `href`: `http:`, `https:`, `mailto:`, `tel:` or relative; rejects `javascript:`/`data:`, including obfuscated forms like `java\tscript:`
- `isPositive(value?)` — `true` for a finite number > 0
- `includesText(text?, search?)` — accent/case-insensitive contains (`"sao"` finds `"São Paulo"`); empty search → `true`
- `isSameText(a?, b?, { ignoreAccents?, ignoreCase?, collapseWhitespace? })` — loose comparison for "type to confirm" dialogs; an empty side never matches
- `hasRole(current, allowed?)` — role check for server or client: missing user → `false`, `allowed` omitted → `true`, `allowed: []` → `false`
- `isDateString(value?)` — `true` for the `YYYY-MM-DD` shape (format only: `2024-02-30` passes)
- `isValidDateString(value?)` — `YYYY-MM-DD` **and** a real calendar date (type guard)
- `isDateTimeString(value?)` — `true` for a date-time (`T` or space separator, `HH:mm[:ss[.fff]]`, optional `Z`/offset); trailing text and impossible dates → `false`
- `isMonthString(value?, { min?, max? })` — `YYYY-MM` with a real month, optionally inside `[min, max]`
- `isPastOrToday(value?, { reference?, timeZone? })` — `true` if the day is on or before `reference` (default today)
- `isValidTimeZone(value?)` — `true` for a time zone `Intl` accepts (guard user-provided zones)
- `isValidPhone(value?)` — `true` for a valid BR phone (landline or mobile)
- `isBirthday(value?, { timeZone? })` — `true` if the date falls on today's day/month (29 Feb → 28 Feb in non-leap years)
- `isWeekend(value?, { timeZone? })` — `true` if the date falls on a weekend (Saturday or Sunday)
- `isWeekday(value?, { timeZone? })` — `true` if the date falls on a weekday (Monday to Friday)
- `isDayOfWeek(value, day, { timeZone? })` — `true` if the date falls on `day` (`0` = Sunday … `6` = Saturday)
- `isSunday(value?)`, `isMonday(value?)`, `isTuesday(value?)`, `isWednesday(value?)`, `isThursday(value?)`, `isFriday(value?)`, `isSaturday(value?)` — shorthands for `isDayOfWeek` (folded into it in 2.0)
- `isValidCPF(value?)` — `true` for a CPF with valid check digits
- `isValidCNPJ(value?)` — `true` for a valid CNPJ (numeric or alphanumeric)
- `isValidDocument(value?)` — validates as CPF or CNPJ based on length
- `isValidPostalCode(value?)` — `true` for an 8-digit CEP
- `isValidEmail(value?)` — `true` for a valid email (TLDs of 2–63 letters)
- `isValidUF(value?)` — `true` for a valid BR state abbreviation (case-insensitive); the `UF` union type is exported
- `isValidPlate(value?)` — `true` for a BR license plate (legacy `AAA9999` or Mercosul `AAA9A99`)
- `isValidPIS(value?)` — `true` for a PIS/PASEP with a valid check digit
- `isValidRenavam(value?)` — `true` for a valid RENAVAM (11 digits or legacy 9–10)
- `isValidCNH(value?)` — `true` for a CNH with valid check digits (Denatran algorithm)
- `isValidVoterId(value?)` — `true` for a valid voter registration number (título de eleitor)
- `isValidBoleto(value?)` — `true` for a valid boleto digitable line (bank slip or collection)

### number

- `precisionRound(value?, precision = 2)` — rounds to N decimal places without float surprises (`1.005` → `1.01`), symmetric for negatives (`-1.005` → `-1.01`)
- `roundInteger(value?, { fallback? })` — rounds to the nearest integer; `0` is a value, `fallback` only for missing/non-finite input
- `formatInteger(...)` — legacy name of `roundInteger` (removed in 2.0)
- `toPositive(value?)` — clamps to a non-negative value
- `getRandomInt(min = 1, max = 100)` — random integer in range (inclusive)
- `percentOf(part?, total?, { fallback = 0 })` — `part / total * 100` without `NaN`/`Infinity`; total ≤ 0 → `fallback`
- `fitWithin(width, height, maxEdge)` — scales a size down so the longer edge fits, keeping the ratio (never upscales), e.g. `(4000, 3000, 1000)` → `{ width: 1000, height: 750 }`
- `safeDivide(value1?, value2?, { allowNegativeDivisor?, fallback? })` — divides; returns `fallback` (0) when the divisor is ≤ 0 or missing, or the numerator is missing/non-finite
- `toCents(value?)` — amount → integer cents, e.g. `19.9` → `1990`, `1.005` → `101` (inverse of `formatCurrency`)
- `parseCurrencyToCents(value?)` — currency string → integer cents, detecting the decimal separator, e.g. `"R$ 1.234,56"` → `123456`, `"1.5"` → `150`, `"1.500"` → `150000`

### object

- `getProperty(obj, key)` — type-safe property access
- `omitFields(obj, keys)` — shallow copy without `keys`
- `getOptionId(option?)` — extracts the `id` from an option/entity
- `getListIds(list?)` — maps a list of entities to their `id`s
- `findOptionById(options?, value?)` — finds the option whose id matches `value` (string compare; numeric ids and `0` accepted), or `null`
- `findOptionsByIds(options?, value?)` — maps each id in `value` to its option, dropping non-matches
- `getLabelById(options?, value?, { key = "name", fallback = "" })` — option's field as a string by id, or `fallback` (positional `key, fallback` still accepted)
- `maskFields(value, fields, { mask? })` — deep-clones a value, masking the string fields listed at any depth (defaults to `maskSecret`)
- `isEqualIgnoringKeys(a, b, keys)` — structural comparison ignoring `keys` at any depth (key order irrelevant, array order significant)
- `swapAtIndex(list, index, offset)` — swaps two items immutably; out of bounds returns the same reference
- `updateAtIndex(list, index, updater)` — copy of `list` with only the item at `index` replaced
- `getFirstFieldError(errors)` — first nested error with a `message` in a react-hook-form-style error tree, as `{ name: 'items.0.price', message }` (ready for `setFocus`)

### parse

- `parseIds(values[], { positive?, unique? })` / `parseIds(...ids)` — comma-separated id strings → `number[]` (trimmed; empty and non-integer entries dropped, so `"1,,2"` → `[1, 2]`); the array form drops `0`/negatives with `positive` and repeats with `unique`
- `resolveIdsToObjects(ids?, resolver, params?)` — resolves an id list into objects via an async resolver (in parallel)
- `resolveList(value?, resolver, params?, { skipErrors? })` — `parseIds` + `resolveIdsToObjects`; accepts a string or string array; `skipErrors` drops ids whose resolver rejects
- `resolveId(value?, resolver, params?)` — resolves the first valid id into an object, or `null`
- `parseJson<T>(value?)` — `JSON.parse` returning `undefined` instead of throwing (a parsed `"null"` stays `null`)
- `toArray(value?)` — wraps a single value in an array or copies an array, dropping `null`/`undefined` (`toArray(undefined)` → `[]`, unlike lodash `castArray`)
- `getMimeType(fileName?, fallback = 'application/octet-stream')` — MIME type from the extension (images incl. webp/bmp/avif, documents, Office, audio, video); `?query`/`#hash` ignored
- `getFileKind(fileName?)` — `'image' | 'pdf' | 'audio' | 'video' | 'office' | 'email' | 'markdown' | 'text' | 'other'`; `?query`/`#hash` ignored
- `hasExtension(fileName?, extensions)` — case-insensitive extension check (with or without the dot); `?query`/`#hash` ignored

- `toStringArray(value, { wrap? })` — narrows an unknown value to `string[]`, dropping entries of other types; non-arrays → `[]` (`wrap: true` turns `"a"` into `["a"]`)
- `getFileExtension(value?)` — extension of a path/URL without the dot; ignores `?query`/`#hash` and dotted hosts, dotfiles → `""`
- `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — WhatsApp-style `*bold*`/`_italic_` (nestable) → `{ text, bold?, italic? }[]`

### transform

- `diffLines(before?, after?)` — line diff (longest common subsequence) returning `{ beforeLines, afterLines }`, each line flagged `changed`
- `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — plain text without the `*`/`_` markers, ready for `truncate`, meta tags or e-mail
- `bytesToBase64(bytes)` — base64 of a `Uint8Array`, chunked (safe for large buffers)
- `toDataUrl(mimeType, bytesOrBase64)` — `data:<mime>;base64,...`

The rest are dependency-free transforms with the `(value, originalValue) => …` shape (matches `yup.transform`); they wrap the base helpers.

- `onlyNumbersTransform(_value, originalValue)` — wraps `onlyNumbers`, e.g. `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — wraps `onlyAlphanumeric`, e.g. `yup.string().transform(onlyAlphanumericTransform)`
- `currencyTransform(_value, originalValue, { divisor = 100 })` — for cents inputs: `"R$ 1.234,56"` → `1234.56`, number `1990` → `19.9`; empty → `null` (works with `.nullable()`/`.required()`); keeps a leading minus. Returns `number | null`.

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

### async

- `sleep(ms, { signal? })` — waits `ms`; an aborted signal rejects at once with `signal.reason`, and the abort listener is always removed
- `retry(fn, { attempts = 3, delayMs = 0, signal?, shouldRetry?, onRetry? })` — runs `fn({ attempt, signal })` until it succeeds; `delayMs` can be `(attempt, error) => ms`; when every attempt fails, rejects with `RetryError` (`attempts`, `cause`); aborts and errors `shouldRetry` declines are rethrown as is
- `tryOrNull(fn, { when? })` — resolves `null` instead of rejecting; narrow it with `when` (e.g. only 404s) so outages still surface
- `settle(promiseOrFn)` — `{ ok: true, value }` or `{ ok: false, error }`, never rejects
- `onceAsync(fn)` — `{ run, reset }`: every `run()` shares one promise; a failure clears it (without wiping a newer load started after `reset()`)

### http

Structural helpers for API errors — no axios dependency.

- `getHttpStatus(error)` — `error.response.status`, `error.status` or `error.statusCode`, else `undefined`
- `getErrorMessage(error, { fallback? })` — the API's `response.data.message`, else `error.message`, else the string itself
- `getValidationErrors(error, { status = 422 })` — Laravel-style `{ message?, errors: { field: string[] } }`, or `null` for other statuses
- `applyValidationErrors(errors, setError, { fieldMap?, fields?, type = 'server' })` — pushes each field's first message to react-hook-form's `setError` (structural); fields outside `fields` go to `unhandled` and don't count as handled
- `readResponseWithProgress(response, { signal?, onProgress?, stepBytes? })` — reads a `fetch` body into a `Blob` with progress; `total` is `0` when unknown or exceeded (compressed responses)

### cache

- `createTtlCache({ ttlMs, maxEntries?, now? })` — in-memory cache with expiry: `get`, `set`, `has`, `delete`, `clear` and `getOrSet(key, load)`, which deduplicates loads in flight and caches nothing on failure

### server

Pure helpers for `getServerSideProps`, Server Components and route handlers — structural types, no `next` import.

- `redirectTo(destination, permanent = false)` — `{ redirect: { destination, permanent } }`
- `getCookie(name, source?)` — reads a cookie from a `Cookie` header string, a request (`IncomingMessage` or `Headers`), or a `cookies()` store; without `source`, `document.cookie` in the browser
- `readJsonCookie(name, source?)` — `getCookie` + `parseJson`; missing/invalid → `null`
- `createServerTiming()` — `{ measure(name, fn), header(), apply(res) }` to send a `Server-Timing` header (durations recorded even when `fn` throws)

### browser (DOM only)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `readFileAsDataURL(file)` — `Promise<string>` with the `data:` URL of a `File`/`Blob`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>` (extension from the name, else the MIME type, else `jpeg`)
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (width > height)
- `isNotificationsSupported()` — checks web push support (`false` during SSR)
- `openInNewTab(url?, { target?, features? })` — `window.open` with `noopener,noreferrer` always applied; returns `null` during SSR and, because of `noopener`, usually even when the tab opened
- `downloadBlob(blob, fileName)` — triggers a file download and revokes the object URL a second later (safe in Safari)
- `downloadJson(data, fileName, { space? })` — serializes to JSON and downloads it (indented by default)
- `resizeImage(file, { maxEdge, quality = 0.9, mimeType = 'image/jpeg', output = 'blob' | 'dataUrl' })` — downscales an image so its longest edge fits `maxEdge` (never upscales); always settles (rejects on decode/encode failure)
- `captureVideoFrame(video, { maxEdge?, quality = 0.75, mimeType?, mirror? })` — current frame of a `<video>` as a `data:` URL (throws when there is no frame yet)
- `stopMediaStream(stream?)` — stops every track of a camera/microphone stream
- `getNetworkInfo()` — `{ isOnline, connectionType, effectiveType, downlink, rtt, saveData }` from the Network Information API; safe during SSR

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
