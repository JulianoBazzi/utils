# @julianobazzi/utils

## 1.3.0

### Minor Changes

- New `async`, `http`, `cache` and `server` groups — pure, framework-free helpers that run on the server and in the browser.
  
  - **async:** `sleep(ms, { signal })` (rejects at once on an aborted signal, never leaks its listener), `retry(fn, { attempts, delayMs, signal, shouldRetry, onRetry })` with `RetryError`, `tryOrNull(fn, { when })`, `settle(promiseOrFn)`, `onceAsync(fn)`.
  - **http:** `getHttpStatus(error)`, `getErrorMessage(error, { fallback })`, `getValidationErrors(error, { status })` (Laravel 422 shape), `applyValidationErrors(errors, setError, { fieldMap, fields, type })` (react-hook-form compatible, no dependency; unknown fields are reported instead of counted as handled), `readResponseWithProgress(response, { signal, onProgress, stepBytes })`.
  - **cache:** `createTtlCache({ ttlMs, maxEntries, now })` with an in-flight-deduplicating `getOrSet`.
  - **server:** `redirectTo(destination, permanent)`, `getCookie(name, source)`, `readJsonCookie(name, source)`, `createServerTiming()` — structural types, no `next` import.
- Browser and file helpers.
  
  - `resizeImage(file, { maxEdge, quality, mimeType, output })` — canvas downscale to a `Blob` or data URL; always settles.
  - `captureVideoFrame(video, { maxEdge, quality, mimeType, mirror })`, `stopMediaStream(stream)`, `getNetworkInfo()`.
  - `getMimeType(fileName, fallback)` (covers webp/bmp/avif/heic and more), `getFileKind(fileName)`, `hasExtension(fileName, extensions)` — all ignore `?query`/`#hash`.
  - `bytesToBase64(bytes)` (chunked) and `toDataUrl(mimeType, bytesOrBase64)`.
- Dates: time zones, strict parsing and wider input types.
  
  **New**
  
  - `timeZone` option (IANA name) on every date helper: `formatDate`, `formatDateTime`, `formatTime`, `formatMonth`, `formatWeekDay`, `formatLongDate`, `getMonthName`, `getWeekDayName`, `getAge`, `formatAge`, `isBirthday`, `isWeekday`, `isWeekend`, `is<Day>`, `getDateRange`, `getMonthRange`, `getMonthOptions`. Built on `Intl` — no dayjs plugin. Only values that carry an instant (`Date`, epoch numbers, `Dayjs`, ISO strings with `Z`/offset) and "today" are converted; naive strings like `"2024-01-02"` are never shifted. Without `timeZone` the output is unchanged.
  - `getToday({ timeZone? })`, `getCurrentMonth({ timeZone? })`, `isValidTimeZone(value)`.
  - `isValidDateString(value)` — `YYYY-MM-DD` plus a calendar check (type guard). `isDateString` keeps checking the format only.
  - `isMonthString(value, { min?, max? })`, `isPastOrToday(value, { reference?, timeZone? })`, `isDayOfWeek(value, day, { timeZone? })`.
  - `normalizeDateRange(range, { min?, max? })` — never returns an inverted range.
  - `formatDateRange(start, end, { separator?, openEnd?, year?, fallback?, timeZone? })`.
  - `formatTime` — new name of `formatHour` (kept as an alias until 2.0); it also accepts a bare time such as `"13:45:00"`.
  - `year?: '2-digit' | 'numeric' | false` on `formatDate`/`formatDateTime` and `seconds?: boolean` on `formatDateTime`/`formatTime`; they take precedence over `simplified`/`showSeconds`, which keep working.
  - Date parameters accept `DateInput = string | number | Date | Dayjs | null | undefined` (exported, with `TimeZoneOptions`, `DateString`, `DateTimeString`, `DayOfWeek`).
  
  **Fixed (visible output changes)**
  
  - Impossible dates no longer roll over: `formatDate("2024-02-30")` returns the fallback instead of `"01/03/24"`, and the same applies to every date helper and to `"2024-01-02 25:00"`.
  - `isDateTimeString` is anchored: `"2026-06-25 11:04abc"` and `"2026-02-30T10:00"` are now `false`; fractional seconds and offsets are accepted.
  - `getMonthRange` returns a future month whole instead of an inverted range; `getDateRange`/`getMonthRange` return empty strings instead of `"Invalid Date"`, and `getMonthOptions` returns `[]` for an invalid `reference`.
  - `isBirthday` accepts strings, and someone born on 29 February has a birthday on 28 February in non-leap years.
- New text, number and validation helpers.
  
  - `pluralize(count, singular, plural | { plural, showCount, formatCount })` — `0` reads as plural (`"0 tarefas"`); a missing count is `0`.
  - `formatNumber(value, { decimals, minDecimals, locale, fallback })` — pt-BR by default (`"1.234,5"`).
  - `normalizeText(value, { casing, collapseWhitespace, trim, removeAccents })`, `includesText(text, search)` and `isSameText(a, b, options)` — accent/case-insensitive search and comparison.
  - `formatList(items, { limit, conjunction, moreLabel, fallback })` — `"a, b e c"`, `"a, b, c e mais 2"`.
  - `formatMilliseconds(ms, { decimals, showMinutes, locale, fallback })` — `"2,3s"`, `"1m 2,3s"`.
  - `formatMailbox({ name, address })`, `buildMapsUrl(address, { fallback })`.
  - `sanitizeFileName(value, { maxLength, fallback, removeAccents, replacement })`.
  - `sanitizeNumeric(value, { allowDecimal, allowNegative })` — same contract as `nextjs-utils`' numeric key handlers.
  - `percentOf(part, total, { fallback })`, `fitWithin(width, height, maxEdge)`.
  - `isPositive(value)`, `isSafeUrl(value, { protocols, allowRelative })`, `hasRole(current, allowed)` (an empty `allowed` list denies).
  - `currencyTransform(value, originalValue, { divisor })` — yup transform for cents inputs; empty → `null`.
  - `getFirstFieldError(errors)` — first nested form error as `{ name: "items.0.price", message }`.
- Numbers and currency: zero is a value, exact rounding, options objects.
  
  **New**
  
  - Options-object forms, with the positional forms still accepted: `formatCurrency(value, { divisor, fallback })`, `currencyToWords(value, { divisor, fallback })`, `formatPercentage(value, { round, decimals, rounding, fallback })`, `formatBytes(bytes, { round, locale, casing, fallback })`, `formatSecondsToTime(value, { seconds, signed, fallback })`, `truncate(value, { length, suffix })`, `getLabelById(options, value, { key, fallback })`.
  - `formatPercentage` gains `decimals` and `rounding: 'round' | 'floor' | 'ceil'`; `formatBytes` and `formatCompactNumber` gain `locale` (defaults unchanged until 2.0); `formatBytes` gains the `casing` option the README already documented; `formatSecondsToTime` gains `signed` and `fallback`.
  - `safeDivide(value1, value2, { allowNegativeDivisor?, fallback? })`; `value1` now accepts `null`/`undefined`.
  - `roundInteger` — new name of `formatInteger` (kept as an alias until 2.0).
  
  **Fixed (visible output changes)**
  
  - Zero is formatted instead of returning the fallback: `formatCurrency(0, { fallback: "-" })` → `"R$ 0,00"`, `formatPercentage(0)` → `"0,00%"` (was `"0%"`), `formatInteger(0, { fallback: -1 })` → `0`. Missing input, `NaN` and `±Infinity` still return the fallback (`formatCurrency(100, 0)` no longer prints `"R$ ∞"`).
  - `formatCurrency`'s default fallback now uses the same non-breaking space as formatted values.
  - `formatPercentage` uses `Intl` pt-BR: thousands separator (`"1.234,50%"`), exact rounding (`1.005` → `"1,01%"`) and symmetric rounding of negatives.
  - Exact, symmetric rounding: `toCents(1.005)` → `101`, `precisionRound(-1.005)` → `-1.01`, `currencyToWords(1.005, 1)` → `"um real e um centavo"`.
  - `safeDivide(NaN, 2)` and `safeDivide(undefined, 2)` return `0` instead of `NaN`.
  - `parseCurrencyToCents` detects the decimal separator: `"1.5"` → `150` (was `1500`), `"1,234.56"` → `123456`.
  - `formatBytes(-1536)` → `"-1.50 KB"` (was `"-1536 Bytes"`).
  - `truncate` counts code points (no split emoji) and returns `""` for `length <= 0`.
- Wider types, exported types and small fixes in objects, parsing, URLs and browser helpers.
  
  **New**
  
  - `parseIds(values[], { positive?, unique? })` — array form with options (the variadic form is unchanged).
  - `resolveList(value, resolver, params, { skipErrors })` — drops ids whose resolver rejects.
  - `buildQueryParams(params, { skipEmpty })`; `Date` values are written as ISO 8601 and plain objects as JSON (they used to become the long `Date#toString` text and `"[object Object]"`).
  - `isValidBarcode(value, { lengths })`.
  - `readFileAsDataURL(file)`.
  - `normalizeEnvironment` — new name of `formatEnvironment` (kept as an alias until 2.0).
  - Exported types: `UF`, `ImageDimensions`, `DurationOptions`, and every options interface that was not exported yet (generators, `maskSecret`, `numberToWords`, `appendValue`, `downloadJson`, `openInNewTab`…).
  
  **Changed types (compatible)**
  
  - `contains(value, items?: readonly T[] | null)`, `joinByKey(values: readonly T[] | null, …)`, `omitFields(obj, keys: readonly K[])`.
  - `findOptionById`, `findOptionsByIds` and `getLabelById` accept numeric ids and readonly arrays; the id `0` now matches instead of returning `null`.
  
  **Fixed**
  
  - `getImageDimensions` takes the extension from the file name, then the MIME type, then `"jpeg"` — a `Blob` named `"blob"` no longer reports `"blob"`.
  - `downloadBlob` revokes the object URL a second after the click (revoking immediately could cancel the download in Safari).
  - `openInNewTab` JSDoc: with `noopener` the return value is `null` even on success, so it cannot detect a popup blocker.
- Query string helpers ported from `nextjs-utils` (pure, server-safe). The ★ test cases match `nextjs-utils`.
  
  - `buildQueryUrl(url, params, { ignore?, keepHash? })` — merges `params` into the query of an existing URL; empty values remove the key, `false`/`0` are written, the hash is kept. Splits at the first `?` and `#`.
  - `isSameQuery(a, b, { ignoreValueOrder? })` — compares two queries by content.
  - `readQueryString`, `readQueryArray`, `readQueryNumber`, `readQueryBoolean`, `readQueryEnum`, `readQueryDate`, `readQueryIds`, `readQueryRange` — typed, never-throwing readers over any `QuerySource` (`URLSearchParams`, query string, Pages Router `query`, App Router `searchParams`).
  - `isRouteActive(pathname, href, { exact? })` — the `useActiveRoute` contract as a plain function.
  - Types `QuerySource` and `QueryValue`.
  
  `parseQueryParams` now carries its JSDoc (it was attached to an internal constant).
- Text, documents, phone and address fixes.
  
  **New**
  
  - `pad` option on `formatCPF`, `formatCNPJ`, `formatPostalCode`, `formatPIS` and `formatDocument` (default `true`; `false` leaves incomplete input unmasked instead of zero-padding it into something that looks valid). The default becomes `false` in 2.0.
  - `formatWithPattern(value, pattern, { placeholder?, token? })` — `placeholder` fills the remaining slots: `('119', '(##) #####-####', { placeholder: '_' })` → `'(11) 9____-____'`.
  - `toStringArray(value, { wrap: true })` turns a single string into `[value]`.
  - `applyCasing(value, 'titlecase', { lowercaseWords })` keeps connectives such as `de`/`da` in lowercase.
  - `onlyAlphanumeric(value, { casing })`; `formatBoolean(value, { fallback })`; `formatCityAndState` gains the `casing` option the README already documented.
  - Every `build*Url` helper accepts `{ fallback: undefined }` and then returns `undefined` for a missing value (typed `string | F`), ready for an `href`.
  - `Address` and the option interfaces of the touched functions are exported.
  
  **Fixed (visible output changes)**
  
  - Phone numbers with a country code: `formatPhone("+55 11 98765-4321")` → `"(11) 98765-4321"` (was `"(55) 11987-6543"`), `buildWhatsAppUrl` → `wa.me/5511…` (was `wa.me/555511…`), `buildPhoneUrl` → `tel:+5511…`. A trunk `0` is dropped, and `0800`/`0300` numbers format as `"0800 123 4567"` and never get a country code.
  - `abbreviateName` uses the **last** word, as documented: `"Maria de Souza"` → `"Maria S."` (was `"Maria d."`); a single word comes back trimmed.
  - `formatAddress` never leaves a dangling separator: `{ city: "X" }` → `"X"` (was `", X"`), `{ district: "Centro", city: "X" }` → `"Centro, X"`.
  - `onlyAlphanumeric("João")` → `"JOAO"` (was `"JOO"`): accents are removed before filtering.
  - `formatCityAndState` trims both parts.
  - Duration formatters (`formatMinutesToDuration`, `formatSecondsToDuration`, `formatDuration`) render `0` as `"0s"` (was `""`) and keep the sign of negatives (`-90` → `"-1h e 30 min"`).
  - `sanitizeSpreadsheetCell` catches formulas after leading whitespace (`" =1+1"`) and leaves plain negative numbers (`"-5"`) alone.
- Add `toArray(value)` — wraps a single value or copies an array, dropping `null`/`undefined` (`toArray(undefined)` → `[]`, unlike lodash's `castArray`). `resolveId`, `resolveList`, `findOptionById` and `findOptionsByIds` now use it internally.
  
  Internal cleanup with no output change: shared casing, pluralization, check-digit and random-digit helpers replace the copies spread across formatters, validators and generators.

### Patch Changes

- Packaging fixes.
  
  - `exports` now points each condition at its own declaration file: `import` → `index.d.ts`, `require` → `index.d.cts`. CommonJS consumers no longer receive ESM types ("Masquerading as ESM" in `attw`). `./package.json` is exported too.
  - `dayjs` is now declared as `^1.11.23` instead of an exact version, so an app that upgrades dayjs keeps a single copy.
  - `CHANGELOG.md` ships inside the package.

## 1.2.0

### Minor Changes

- Add `date` and `url` modules, plus Portuguese month/weekday names and environment normalization.

  **New — `date` module** (inclusive `YYYY-MM-DD` windows for filters and pickers):

  - `getDateRange(days, { reference?, offset? })` — window of `days` days ending at `reference`
  - `getMonthRange(month, { reference? })` — full month range, clamped to `reference` while the month is ongoing
  - `getMonthOptions({ count?, reference?, min? })` — month picker list as `{ id, name }`

  **New — `url` module:**

  - `buildQueryParams(params?, { ignore?, prefix? })` — object to query string, arrays become repeated keys
  - `parseQueryParams(value?)` — the inverse; repeated keys become arrays

  **New — `formatting`:**

  - `getMonthName(value?, { short?, fallback?, casing? })` — e.g. `Julho` / `Jul`
  - `getWeekDayName(value?, { short?, fallback?, casing? })` — e.g. `Sábado` / `Sáb`
  - `formatEnvironment(value?)` — normalizes a `NODE_ENV` string to `NodeEnv`; unknown values fall back to `production`

  **Changed — `joinByKey`:**

  - New `unique` option drops duplicate values, keeping the first occurrence.
  - Values that are `null`, `undefined` or an empty string are now skipped instead of being rendered — previously a missing property produced the literal string `"undefined"` in the output. Falsy-but-meaningful values such as `0` are still included.

- Add four generators, closing the remaining validator/generator gaps.

  - `generateOTP({ length? })` — numeric one-time password, 6 digits by default, leading zeros preserved. Unlike the other generators it draws from the Web Crypto API (`globalThis.crypto.getRandomValues`) with rejection sampling, so the digits are uniformly distributed and the result is safe for production sign-in codes. Works in Node and the browser; no `node:crypto` import, so browser builds are unaffected.
  - `generateBoleto({ type?, formatted? })` — valid digitable line for bank slips (47 digits, default) and collection slips/arrecadação (48 digits). Reuses the same mod-10/mod-11 helpers `isValidBoleto` uses, so the round-trip holds by construction, formatted or not.
  - `generateEmail({ domain?, length? })` — valid address, defaulting to the RFC 2606 reserved `example.com` domain so a test can never send real mail.
  - `generateUF()` — random state code from the 27 federative units, typed as the literal union of the codes.

  `isValidUF` now reads its list from a shared internal constant instead of an inline regex — same behaviour, single source of truth with `generateUF`.

- Promote shared helpers out of the consumer apps: audit-log diffing/masking, file and inline-markup parsing, browser downloads and immutable array edits.

  **New — `transform`:**

  - `diffLines(before?, after?)` — line diff via longest common subsequence, returning `{ beforeLines, afterLines }` with each line flagged `changed`
  - `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — plain text without the `*`/`_` markers

  **New — `parse`:**

  - `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — WhatsApp-style `*bold*`/`_italic_` (nestable) into styled segments
  - `parseJson<T>(value?)` — `JSON.parse` returning `undefined` instead of throwing
  - `getFileExtension(value?)` — extension of a path/URL, ignoring `?query`/`#hash` and dotted hosts
  - `toStringArray(value)` — narrows an unknown value to `string[]`

  **New — `object`:**

  - `maskFields(value, fields, { mask? })` — deep-clone masking the string fields listed, at any depth (defaults to `maskSecret`)
  - `isEqualIgnoringKeys(a, b, keys)` — structural comparison ignoring volatile keys such as `updated_at`
  - `swapAtIndex(list, index, offset)` — immutable swap; out of bounds returns the same reference
  - `updateAtIndex(list, index, updater)` — copy with only one item replaced

  **New — `browser`:**

  - `openInNewTab(url?, { target?, features? })` — `window.open` with `noopener,noreferrer` always applied
  - `downloadBlob(blob, fileName)` / `downloadJson(data, fileName, { space? })` — file downloads

  **New — `formatting`:**

  - `getFirstAndLastWord(value?, { fallback?, casing? })` — keeps only the first and last word

  **Internal:** `isValidJson` is now implemented on top of `parseJson`; behaviour is unchanged.

### Patch Changes

- Security and robustness fixes from a full code audit.

  **Security**

  - `maskSecret`: `visibleEnd: 0` (or a negative value) used to return the **whole secret** because of `slice(-0)`; both counts are now clamped to non-negative integers and `0` hides that side entirely.
  - `parseQueryParams`: no longer confuses inherited `Object.prototype` members with existing keys (`?hasOwnProperty=x` returned `[Function, "x"]`) and skips `__proto__` / `constructor` / `prototype`, which could swap the result's prototype.
  - `buildEmailUrl`: the address is URL-encoded (keeping `@`), so `a@b.com?bcc=…` can no longer inject extra `mailto:` fields.
  - `buildInstagramUrl` / `buildFacebookUrl` / `buildLinkedInUrl`: the handle is URL-encoded, so `?`, `#` or `/` can't alter the target path.

  **Bug fixes**

  - `formatMinutesToDuration` / `formatSecondsToDuration` / `formatDuration`: round before splitting (`119.6` → `"2h"`, not `"1h e 60 min"`; `0.333` → `"20s"`); negatives are treated as positive.
  - `formatDate`, `formatDateTime`, `formatHour`, `formatMonth`, `formatWeekDay`, `formatTimeAgo`: invalid dates now return `fallback` instead of `"Invalid Date"` / `"1 mês"`; `formatTimeAgo` clamps future dates to `"1 minuto"`.
  - `formatSecondsToTime`: pure arithmetic (no clock/timezone/DST dependency); hours keep counting past 24 (`90000` → `"25:00:00"`, previously wrapped to `"01:00:00"`).
  - `parseIds`: entries are trimmed and only base-10 integers are kept — `"1,,2"` → `[1, 2]` (previously `[1, 0, 2]`), `"1e3"`/`"0x10"`/`"Infinity"` are dropped.
  - `formatCPF` / `formatPIS` / `formatPostalCode`: inputs longer than the document return plain digits instead of a half-masked string.
  - `precisionRound`: `1.005` → `1.01` (was `1`); non-finite input → `0`.
  - `isValidEmail`: accepts TLDs up to 63 letters (`.photography`, `.international`).
  - `isNotificationsSupported`: returns `false` during SSR instead of throwing.
  - `generateOTP`: non-finite `length` → `""` instead of a `RangeError`.
  - `abbreviateName`: blank input → `""`.

  **Tooling**

  - CI uses the pinned `packageManager` pnpm version; transitive dev-only advisories (postcss, nanoid) resolved via `pnpm-workspace.yaml` overrides.

- Update the `dayjs` runtime dependency to 1.11.23.
