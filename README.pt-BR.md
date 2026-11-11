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

[English](README.md) | **Português**

Uma coleção de pequenas funções utilitárias em TypeScript, com suporte a tree-shaking. Distribuída em ESM + CJS com definições de tipo incluídas.

## Instalação

```bash
npm install @julianobazzi/utils
```

## Uso

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

Todas as funções são exportadas de forma plana a partir da raiz do pacote, agrupadas internamente por finalidade.

### formatting (formatação)

- `formatDate(value?, { year?, simplified?, fallback?, timeZone? })` — `DD/MM/YY`; `year: 'numeric'` → `DD/MM/YYYY`, `year: false` → `DD/MM`; data impossível (`2024-02-30`) → `fallback`
- `formatDateTime(date?, { year?, seconds?, simplified?, showSeconds?, fallback?, timeZone? })` — `DD/MM/YY HH:mm`; `year` como no `formatDate`, `seconds: true` acrescenta `:ss`; data inválida → `fallback`
- `formatMonth(value?, { fallback?, timeZone? })` — `MM/YYYY`; data inválida → `fallback`
- `getMonthName(value?, { short?, fallback?, casing?, timeZone? })` — nome do mês em PT-BR, ex.: `Julho` / `Jul`
- `getWeekDayName(value?, { short?, fallback?, casing?, timeZone? })` — nome do dia da semana em PT-BR, ex.: `Sábado` / `Sáb`
- `formatTime(value?, { seconds?, simplified?, fallback?, timeZone? })` — `HH:mm` (ou `HH:mm:ss`); também aceita hora pura (`"13:45:00"`); inválido → `fallback`
- `formatHour(...)` — nome legado do `formatTime` (sai na 2.0)
- `formatDateRange(start?, end?, { separator?, openEnd?, year?, fallback?, timeZone? })` — `01/01/24 a 31/01/24`; mesmo dia aparece uma vez; sem fim → texto de `openEnd` ou `fallback`
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — duração legível, ex.: `1h e 30 min` (arredonda p/ minutos/segundos inteiros antes; negativos viram positivos)
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — idem, a partir de segundos (≥60s arredonda p/ minutos)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated**, alias de `formatMinutesToDuration`
- `formatCurrency(value?, divisor = 100, { fallback? })` — moeda BRL, ex.: `R$ 19,90`
- `formatCompactNumber(value?, { decimals?, fallback? })` — notação compacta (EN), ex.: `1.5M`, `100K`
- `formatPercentage(value?, round = false, { fallback? })` — porcentagem, ex.: `12,50%`
- `formatBoolean(value?, { casing? })` — `Sim` / `Não`
- `formatPhone(phone?, { fallback? })` — máscara de telefone BR (10 ou 11 dígitos)
- `formatBytes(bytes?, round = false, { casing? })` — tamanho legível, ex.: `1.50 KB`
- `formatSecondsToTime(value?, showSeconds = true)` — `HH:mm:ss` (ou `HH:mm`); aritmética pura, horas passam de 24 (`90000` → `25:00:00`)
- `formatTimeAgo(date?, { fallback? })` — tempo decorrido em PT, ex.: `5 dias`; data inválida → `fallback`, data futura → `1 minuto`
- `formatAddress(address, { fallback? })` — monta um endereço em uma linha
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"Cidade - UF"` (vazio quando ambos ausentes)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat?, timeZone? })` — data + dia da semana abreviado, ex.: `15/6 - Sáb` (`dateFormat` default `D/M`); data inválida → `fallback`
- `getAge(birthDate?, { timeZone? })` — idade em anos completos (hoje); ausente/inválido/futuro → `0`
- `formatAge(birthDate?, { fallback?, timeZone? })` — idade em texto PT-BR, ex.: `"36 anos"` / `"1 ano"`
- `formatCPF(value?, { fallback? })` — `000.000.000-00` (completa com zeros; > 11 dígitos → só dígitos)
- `formatCNPJ(value?, { fallback? })` — `00.000.000/0000-00` (suporta CNPJ alfanumérico)
- `formatDocument(value?, { fallback? })` — formata como CPF ou CNPJ conforme o tamanho
- `formatPostalCode(value?, { fallback? })` — CEP `00000-000` (> 8 dígitos → só dígitos)
- `formatPlate(value?, { fallback? })` — placa BR: antiga → `ABC-1234`, Mercosul mantém `ABC1D23`
- `formatPIS(value?, { fallback? })` — PIS/PASEP `000.00000.00-0` (> 11 dígitos → só dígitos)
- `formatLongDate(value?, { fallback?, casing?, timeZone? })` — data por extenso, ex.: `1º de julho de 2026`
- `numberToWords(value?, { fallback? })` — inteiro por extenso até trilhões, ex.: `mil duzentos e trinta e quatro`
- `currencyToWords(value?, divisor = 100, { fallback? })` — valor BRL por extenso (espelha `formatCurrency`), ex.: `dezenove reais e noventa centavos`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — junta dois textos (cada um com trim), ex.: `"a; b"`
- `applyCasing(value, casing?)` — `lowercase` / `uppercase` / `titlecase` (titlecase preserva o resto de cada palavra, ex.: `"KB"`)
- `removeAccents(value?)` — remove acentos, ex.: `João` → `Joao`
- `onlyNumbers(value?)` — remove tudo que não for dígito
- `onlyAlphanumeric(value?)` — remove não-alfanuméricos + uppercase (`"12.abc"` → `"12ABC"`)
- `formatWithPattern(value?, pattern?)` — máscara char-agnostic (`#` = próximo char), ex.: `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`
- `truncate(value?, length = 40)` — corta o texto e adiciona `...`
- `getLastCharacter(value?)` — último caractere de uma string
- `abbreviateName(name?, { casing? })` — `"John Smith"` → `"John S."` (titlecase normaliza: `"JOAO SILVA"` → `"Joao S."`; entrada em branco → `""`)
- `getFirstAndLastWord(value?, { fallback?, casing? })` — mantém só a primeira e a última palavra: `"Analista de Sistemas"` → `"Analista Sistemas"`
- `joinByKey(values, key, dividerOrOptions?)` — junta uma propriedade de cada objeto, ignorando valores vazios; 3º arg é string (divider) ou `{ divider?, sort?, unique? }`, onde `sort` (`true | "asc" | "desc"`) ordena por `key` antes e `unique` remove duplicados
- `maskSecret(value?, { visibleStart = 5, visibleEnd = 5, mask = '••••••' })` — mascara parcialmente um segredo, mantendo as pontas visíveis, ex.: `$2y$1••••••lMnOp` (valores curtos → só a máscara; `visibleStart`/`visibleEnd` são limitados a ≥ 0, então `0` esconde aquele lado por completo)
- `slugify(value?)` — slug URL-safe (sem acento, minúsculo, hifenizado), ex.: `"São Paulo"` → `sao-paulo`
- `sanitizeSpreadsheetCell(value?)` — protege contra injeção de fórmula em CSV/Excel: prefixa `'` quando o valor começa com `= + - @` (tab/CR)
- `buildWhatsAppUrl(phone?, message?, { countryCode = '55', fallback? })` — link `wa.me`; `countryCode` aceita `null` para omitir, ex.: `https://wa.me/5511987654321?text=...`
- `buildPhoneUrl(phone?, { countryCode = '55', fallback? })` — link `tel:`, ex.: `tel:+5511987654321` (`countryCode: null` → `tel:11987654321`)
- `buildEmailUrl(email?, { subject?, body?, fallback? })` — link `mailto:` com `subject`/`body` opcionais (encodados); o endereço também é encodado (sem injeção de cabeçalhos via `?`/`&`)
- `buildInstagramUrl(username?, { fallback? })` — `https://instagram.com/<handle>` (remove `@` inicial; handle é encodado)
- `buildFacebookUrl(username?, { fallback? })` — `https://facebook.com/<handle>` (remove `@` inicial; handle é encodado)
- `buildLinkedInUrl(handle?, { type = 'profile', fallback? })` — `https://linkedin.com/in/...` ou `/company/...` (via `type`; handle é encodado)
- `formatEnvironment(value?)` — normaliza uma string de `NODE_ENV` para `production | homologation | development | test` (desconhecido → `production`)

### date (datas)

Helpers de janela de datas para filtros e seletores. Entrada e saída em `YYYY-MM-DD`; os intervalos são inclusivos nas duas pontas. Entrada inválida dá `{ startDate: '', endDate: '' }` (nunca `"Invalid Date"`).

- `getToday({ timeZone? })` — hoje como `YYYY-MM-DD`, ex.: a data do Brasil num servidor em UTC
- `getCurrentMonth({ timeZone? })` — mês atual como `YYYY-MM`

- `getDateRange(days, { reference?, offset?, timeZone? })` — janela de `days` dias terminando em `reference` (default hoje), ex.: `getDateRange(7)` → últimos 7 dias; `offset` desloca para trás (`{ offset: 1 }` termina ontem)
- `getMonthRange(month, { reference?, timeZone? })` — intervalo completo de um mês `YYYY-MM`; mês em andamento é limitado a `reference` em vez de um último dia no futuro; mês futuro volta completo (nunca invertido)
- `getMonthOptions({ count = 12, reference?, min?, timeZone? })` — lista para seletor de mês, do mais recente ao mais antigo, como `{ id: 'YYYY-MM', name: 'Julho/2026' }` (funciona com `findOptionById` / `getLabelById`); `min` corta os meses anteriores
- `normalizeDateRange(range, { min?, max? })` — troca pontas invertidas e limita a `[min, max]`; nunca devolve `startDate > endDate`

#### Fuso horário

Toda função de data aceita `timeZone` (nome IANA, como `"America/Sao_Paulo"`). Ele só se aplica a valores que carregam um instante — `Date`, número (epoch), `Dayjs` e strings ISO com `Z` ou offset — e ao "hoje". Strings ingênuas (`"2024-01-02"`, `"2024-01-02 13:45"`) já são horário de parede e nunca são deslocadas. Sem `timeZone`, vale o fuso do runtime, como antes. Não precisa de plugin do dayjs; fuso inválido lança `RangeError` (cheque com `isValidTimeZone`).

```ts
// Servidor em UTC, 02:00 UTC de 2/jan = 23:00 de 1/jan em São Paulo
formatDate("2024-01-02T02:00:00Z", { timeZone: "America/Sao_Paulo" }); // "01/01/24"
getToday({ timeZone: "America/Sao_Paulo" }); // "2024-01-01"
formatDate("2024-01-02", { timeZone: "Asia/Tokyo" }); // "02/01/24" (ingênua: não desloca)
```

### url

- `buildQueryParams(params?, { ignore?, prefix? })` — serializa um objeto em query string; ignora `null`/`undefined`, expande arrays em chaves repetidas, retorna `""` quando vazio, ex.: `{ id: [1, 2] }` → `?id=1&id=2`
- `parseQueryParams(value?)` — o inverso; chaves repetidas viram array (o que `Object.fromEntries(new URLSearchParams(...))` perde). Aceita a string com ou sem `?` inicial; chaves de protótipo (`__proto__`, `constructor`, `prototype`) são ignoradas

### mask (constantes)

Padrões de máscara de input (convenção react-input-mask: `9` = dígito, `a` = letra, `*` = alfanumérico).

- `CPF_MASK` — `999.999.999-99`
- `CNPJ_MASK` — `99.999.999/9999-99`
- `CNPJ_ALPHANUMERIC_MASK` — `**.***.***/****-99`
- `PHONE_MASK` — `(99) 9999-9999` (fixo)
- `CELLPHONE_MASK` — `(99) 99999-9999` (celular)
- `POSTAL_CODE_MASK` — `99999-999` (CEP)
- `PLATE_MASK` — `aaa-9*99` (placa; o slot `*` cobre antiga e Mercosul)
- `PIS_MASK` — `999.99999.99-9` (PIS/PASEP)

### validation (validação)

- `contains(value, items)` — `true` se `value` está em `items`
- `isOdd(value)` — `true` para números ímpares (trata negativos)
- `isValidJson(value?)` — `true` se a string é um JSON válido
- `isValidBarcode(value)` — `true` para dígito verificador EAN/GTIN válido
- `isValidUrl(value)` — `true` para URL `http`/`https` válida
- `isDateString(value?)` — `true` para o formato `YYYY-MM-DD` (só o formato: `2024-02-30` passa)
- `isValidDateString(value?)` — `YYYY-MM-DD` **e** data real do calendário (type guard)
- `isDateTimeString(value?)` — `true` para data-hora (separador `T` ou espaço, `HH:mm[:ss[.fff]]`, `Z`/offset opcional); texto sobrando e data impossível → `false`
- `isMonthString(value?, { min?, max? })` — `YYYY-MM` com mês válido, opcionalmente dentro de `[min, max]`
- `isPastOrToday(value?, { reference?, timeZone? })` — `true` se o dia é igual ou anterior a `reference` (default hoje)
- `isValidTimeZone(value?)` — `true` para fuso aceito pelo `Intl` (valida fuso vindo do usuário)
- `isValidPhone(value?)` — `true` para telefone BR válido (fixo ou celular)
- `isBirthday(value?, { timeZone? })` — `true` se a data cai no dia/mês de hoje (29/02 → 28/02 em ano não bissexto)
- `isWeekend(value?, { timeZone? })` — `true` se a data cai no fim de semana (sábado ou domingo)
- `isWeekday(value?, { timeZone? })` — `true` se a data cai em dia útil (segunda a sexta)
- `isDayOfWeek(value, day, { timeZone? })` — `true` se a data cai em `day` (`0` = domingo … `6` = sábado)
- `isSunday(value?)`, `isMonday(value?)`, `isTuesday(value?)`, `isWednesday(value?)`, `isThursday(value?)`, `isFriday(value?)`, `isSaturday(value?)` — atalhos para `isDayOfWeek` (incorporados a ele na 2.0)
- `isValidCPF(value?)` — `true` para CPF com dígitos verificadores válidos
- `isValidCNPJ(value?)` — `true` para CNPJ válido (numérico ou alfanumérico)
- `isValidDocument(value?)` — valida como CPF ou CNPJ conforme o tamanho
- `isValidPostalCode(value?)` — `true` para CEP de 8 dígitos
- `isValidEmail(value?)` — `true` para email válido (TLDs de 2–63 letras)
- `isValidUF(value?)` — `true` para sigla de estado BR válida (case-insensitive)
- `isValidPlate(value?)` — `true` para placa BR (antiga `AAA9999` ou Mercosul `AAA9A99`)
- `isValidPIS(value?)` — `true` para PIS/PASEP com dígito verificador válido
- `isValidRenavam(value?)` — `true` para RENAVAM válido (11 dígitos ou legado 9–10)
- `isValidCNH(value?)` — `true` para CNH com dígitos verificadores válidos (algoritmo Denatran)
- `isValidVoterId(value?)` — `true` para título de eleitor válido (UF + dígitos, com exceção SP/MG)
- `isValidBoleto(value?)` — `true` para linha digitável de boleto válida (bancário ou arrecadação)

### number (números)

- `precisionRound(value?, precision = 2)` — arredonda para N casas decimais sem surpresas de ponto flutuante (`1.005` → `1.01`)
- `formatInteger(value?, { fallback? })` — arredonda para o inteiro mais próximo
- `toPositive(value?)` — limita a um valor não negativo
- `getRandomInt(min = 1, max = 100)` — inteiro aleatório no intervalo (inclusivo)
- `safeDivide(value1, value2?)` — divide; 0 quando o divisor é ≤ 0 ou ausente
- `toCents(value?)` — valor → centavos inteiros, ex.: `19.9` → `1990` (inverso de `formatCurrency`)
- `parseCurrencyToCents(value?)` — string BRL → centavos inteiros, ex.: `"R$ 1.234,56"` → `123456`

### object (objetos)

- `getProperty(obj, key)` — acesso a propriedade com tipagem segura
- `omitFields(obj, keys)` — cópia rasa sem as `keys`
- `getOptionId(option?)` — extrai o `id` de uma opção/entidade
- `getListIds(list?)` — mapeia uma lista de entidades para seus `id`s
- `findOptionById(options?, value?)` — acha a opção cujo id casa com `value` (compara como string), ou `null`
- `findOptionsByIds(options?, value?)` — mapeia cada id de `value` p/ sua opção, descartando sem match
- `getLabelById(options?, value?, key = "name", fallback = "")` — campo da opção como string pelo id, ou `fallback`
- `maskFields(value, fields, { mask? })` — clona em profundidade mascarando os campos string listados, em qualquer nível (default `maskSecret`)
- `isEqualIgnoringKeys(a, b, keys)` — comparação estrutural ignorando `keys` em qualquer profundidade (ordem de chave irrelevante, ordem de array significativa)
- `swapAtIndex(list, index, offset)` — troca dois itens de forma imutável; fora dos limites devolve a mesma referência
- `updateAtIndex(list, index, updater)` — cópia da lista com só o item de `index` substituído

### parse (conversão)

- `parseIds(...ids)` — strings de ids separadas por vírgula → `number[]` (com trim; entradas vazias e não inteiras são descartadas, então `"1,,2"` → `[1, 2]`)
- `resolveIdsToObjects(ids?, resolver, params?)` — resolve uma lista de ids em objetos via resolver async (em paralelo)
- `resolveList(value?, resolver, params?)` — `parseIds` + `resolveIdsToObjects`; aceita string ou array de strings
- `resolveId(value?, resolver, params?)` — resolve o 1º id válido em objeto, ou `null`
- `parseJson<T>(value?)` — `JSON.parse` que devolve `undefined` em vez de lançar (`"null"` parseado continua `null`)
- `toArray(value?)` — embrulha um valor único num array ou copia um array, descartando `null`/`undefined` (`toArray(undefined)` → `[]`, diferente do `castArray` do lodash)
- `toStringArray(value)` — reduz um valor desconhecido a `string[]`, descartando entradas de outros tipos; não-array → `[]`
- `getFileExtension(value?)` — extensão de um caminho/URL sem o ponto; ignora `?query`/`#hash` e host com ponto, dotfiles → `""`
- `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — markup estilo WhatsApp `*negrito*`/`_itálico_` (aninhável) → `{ text, bold?, italic? }[]`

### transform

- `diffLines(before?, after?)` — diff linha a linha (maior subsequência comum) devolvendo `{ beforeLines, afterLines }`, com cada linha marcada em `changed`
- `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — texto puro sem os marcadores `*`/`_`, pronto p/ `truncate`, meta tags ou e-mail

Os demais são transforms dependency-free no formato `(value, originalValue) => string` (igual ao `yup.transform`); embrulham as funções base.

- `onlyNumbersTransform(_value, originalValue)` — embrulha `onlyNumbers`, ex.: `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — embrulha `onlyAlphanumeric`, ex.: `yup.string().transform(onlyAlphanumericTransform)`

### generate (geradores p/ testes/seeds)

Todos os geradores produzem valores aleatórios que passam no validador correspondente. Usam `Math.random` e servem para testes e seeds — **exceto `generateOTP`**, que sorteia via Web Crypto e é seguro para uso em produção.

- `generateOTP({ length? })` — código numérico de uso único (default 6 dígitos), preservando zeros à esquerda; criptograficamente seguro, funciona no Node e no browser
- `generateCPF({ formatted? })` — CPF válido; `formatted: true` → `000.000.000-00`
- `generateCNPJ({ formatted?, alphanumeric? })` — CNPJ válido (filial `0001`); `alphanumeric: true` → formato 2026
- `generatePIS({ formatted? })` — PIS/PASEP válido; `formatted: true` → `000.00000.00-0`
- `generateRenavam({ legacy? })` — RENAVAM válido; `legacy: true` → formato antigo de 9 dígitos
- `generateCNH()` — CNH válida (algoritmo Denatran)
- `generateVoterId()` — título de eleitor válido (UF aleatória 01–28)
- `generatePlate({ mercosul?, formatted? })` — placa válida; Mercosul por default, `mercosul: false` → antiga
- `generateBarcode({ length? })` — código EAN/GTIN válido (8/12/13/14 dígitos, default EAN-13)
- `generateBoleto({ type?, formatted? })` — linha digitável de boleto válida; bancária por default (47 dígitos), `type: 'collection'` → arrecadação (48 dígitos)
- `generatePhone({ mobile?, formatted? })` — telefone BR válido; celular por default, `mobile: false` → fixo
- `generatePostalCode({ formatted? })` — CEP de 8 dígitos; `formatted: true` → `00000-000`
- `generateUF()` — sigla de estado aleatória entre as 27 unidades federativas, ex.: `SP`
- `generateEmail({ domain?, length? })` — e-mail válido; default no domínio `example.com`, reservado pela RFC 2606 e que nunca roteia

### browser (somente DOM)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>`
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (largura > altura)
- `isNotificationsSupported()` — verifica suporte a web push (`false` em SSR)
- `openInNewTab(url?, { target?, features? })` — `window.open` com `noopener,noreferrer` sempre aplicado (`null` em SSR ou se bloqueado)
- `downloadBlob(blob, fileName)` — dispara o download de um arquivo e revoga o object URL
- `downloadJson(data, fileName, { space? })` — serializa em JSON e baixa (indentado por default)

## Scripts

| Script               | Descrição                                          |
| -------------------- | -------------------------------------------------- |
| `npm run build`      | Empacota em `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev`        | Build em modo watch                                |
| `npm run test`       | Roda os testes uma vez (Vitest)                    |
| `npm run test:watch` | Roda os testes em modo watch                       |
| `npm run test:coverage` | Roda os testes com cobertura (thresholds ativos) |
| `npm run typecheck`  | Checagem de tipos com `tsc --noEmit`               |
| `npm run check:exports` | Confere os tipos das entradas ESM/CJS com `attw` (rodar após o `build`) |
| `npm run lint`       | Lint + checagem de formatação (Biome)              |
| `npm run lint:fix`   | Aplica correções seguras de lint/formatação        |

## Adicionando um utilitário

1. Crie `src/<grupo>/<nome>.ts` com um export nomeado (`export function <nome>`).
2. Adicione `src/<grupo>/<nome>.test.ts` com testes Vitest.
3. Reexporte no barrel do grupo `src/<grupo>/index.ts`.
4. Grupo novo? Crie `src/<grupo>/index.ts` e inclua em `src/index.ts`.

## Licença

MIT © Juliano Bazzi
