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

- `formatDate(value?, { simplified?, fallback? })` — `DD/MM/YY` (ou `DD/MM/YYYY`)
- `formatDateTime(date?, { simplified?, showSeconds?, fallback? })` — `DD/MM/YY HH:mm` (ano 4 dígitos e/ou `:ss` opcionais)
- `formatMonth(value?, { fallback? })` — `MM/YYYY`
- `formatHour(value?, { simplified?, fallback? })` — `HH:mm` (ou `HH:mm:ss`)
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — duração legível, ex.: `1h e 30 min`
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — idem, a partir de segundos (≥60s arredonda p/ minutos)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated**, alias de `formatMinutesToDuration`
- `formatCurrency(value?, divisor = 100, { fallback? })` — moeda BRL, ex.: `R$ 19,90`
- `formatCompactNumber(value?, { decimals?, fallback? })` — notação compacta (EN), ex.: `1.5M`, `100K`
- `formatPercentage(value?, round = false, { fallback? })` — porcentagem, ex.: `12,50%`
- `formatBoolean(value?, { casing? })` — `Sim` / `Não`
- `formatPhone(phone?, { fallback? })` — máscara de telefone BR (10 ou 11 dígitos)
- `formatBytes(bytes?, round = false, { casing? })` — tamanho legível, ex.: `1.50 KB`
- `formatSecondsToTime(value?, showSeconds = true)` — `HH:mm:ss` (ou `HH:mm`)
- `formatTimeAgo(date?, { fallback?, casing? })` — tempo decorrido em PT, ex.: `5 dias`
- `formatAddress(address, { fallback? })` — monta um endereço em uma linha
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"Cidade - UF"` (vazio quando ambos ausentes)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat? })` — data + dia da semana abreviado, ex.: `15/6 - Sáb` (`dateFormat` default `D/M`)
- `formatCPF(value?, { fallback? })` — `000.000.000-00`
- `formatCNPJ(value?, { fallback? })` — `00.000.000/0000-00` (suporta CNPJ alfanumérico)
- `formatDocument(value?, { fallback? })` — formata como CPF ou CNPJ conforme o tamanho
- `formatPostalCode(value?, { fallback? })` — CEP `00000-000`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — junta dois textos (cada um com trim), ex.: `"a; b"`
- `applyCasing(value, casing?)` — `lowercase` / `uppercase` / `titlecase` (titlecase preserva o resto de cada palavra, ex.: `"KB"`)
- `removeAccents(value?)` — remove acentos, ex.: `João` → `Joao`
- `onlyNumbers(value?)` — remove tudo que não for dígito
- `onlyAlphanumeric(value?)` — remove não-alfanuméricos + uppercase (`"12.abc"` → `"12ABC"`)
- `formatWithPattern(value?, pattern?)` — máscara char-agnostic (`#` = próximo char), ex.: `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`
- `truncate(value?, length = 40)` — corta o texto e adiciona `...`
- `getLastCharacter(value?)` — último caractere de uma string
- `abbreviateName(name?, { casing? })` — `"John Smith"` → `"John S."` (titlecase normaliza: `"JOAO SILVA"` → `"Joao S."`)
- `joinByKey(values, key, dividerOrOptions?)` — junta uma propriedade de cada objeto; 3º arg é string (divider) ou `{ divider?, sort? }`, onde `sort` (`true | "asc" | "desc"`) ordena por `key` antes

### mask (constantes)

Padrões de máscara de input (convenção react-input-mask: `9` = dígito, `*` = alfanumérico).

- `CPF_MASK` — `999.999.999-99`
- `CNPJ_MASK` — `99.999.999/9999-99`
- `CNPJ_ALPHANUMERIC_MASK` — `**.***.***/****-99`
- `PHONE_MASK` — `(99) 9999-9999` (fixo)
- `CELLPHONE_MASK` — `(99) 99999-9999` (celular)
- `POSTAL_CODE_MASK` — `99999-999` (CEP)

### validation (validação)

- `contains(value, items)` — `true` se `value` está em `items`
- `isOdd(value)` — `true` para números ímpares (trata negativos)
- `isValidJson(value?)` — `true` se a string é um JSON válido
- `isValidBarcode(value)` — `true` para dígito verificador EAN/GTIN válido
- `isValidUrl(value)` — `true` para URL `http`/`https` válida
- `isValidPhone(value?)` — `true` para telefone BR válido (fixo ou celular)
- `isBirthday(value?)` — `true` se a data cai no dia/mês de hoje
- `isValidCPF(value?)` — `true` para CPF com dígitos verificadores válidos
- `isValidCNPJ(value?)` — `true` para CNPJ válido (numérico ou alfanumérico)
- `isValidDocument(value?)` — valida como CPF ou CNPJ conforme o tamanho
- `isValidPostalCode(value?)` — `true` para CEP de 8 dígitos
- `isValidEmail(value?)` — `true` para email válido
- `isValidUF(value?)` — `true` para sigla de estado BR válida (case-insensitive)

### number (números)

- `precisionRound(value?, precision = 2)` — arredonda para N casas decimais
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

### parse (conversão)

- `parseIds(...ids)` — strings de ids separadas por vírgula → `number[]`
- `resolveIdsToObjects(ids?, resolver, params?)` — resolve uma lista de ids em objetos via resolver async (em paralelo)
- `resolveList(value?, resolver, params?)` — `parseIds` + `resolveIdsToObjects`; aceita string ou array de strings
- `resolveId(value?, resolver, params?)` — resolve o 1º id válido em objeto, ou `null`

### transform (compatível com yup)

Transforms dependency-free no formato `(value, originalValue) => string` (igual ao `yup.transform`); embrulham as funções base.

- `onlyNumbersTransform(_value, originalValue)` — embrulha `onlyNumbers`, ex.: `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — embrulha `onlyAlphanumeric`, ex.: `yup.string().transform(onlyAlphanumericTransform)`

### browser (somente DOM)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>`
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (largura > altura)
- `isNotificationsSupported()` — verifica suporte a web push

## Scripts

| Script               | Descrição                                          |
| -------------------- | -------------------------------------------------- |
| `npm run build`      | Empacota em `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev`        | Build em modo watch                                |
| `npm run test`       | Roda os testes uma vez (Vitest)                    |
| `npm run test:watch` | Roda os testes em modo watch                       |
| `npm run typecheck`  | Checagem de tipos com `tsc --noEmit`               |
| `npm run lint`       | Lint + checagem de formatação (Biome)              |
| `npm run lint:fix`   | Aplica correções seguras de lint/formatação        |

## Adicionando um utilitário

1. Crie `src/<grupo>/<nome>.ts` com um export nomeado (`export function <nome>`).
2. Adicione `src/<grupo>/<nome>.test.ts` com testes Vitest.
3. Reexporte no barrel do grupo `src/<grupo>/index.ts`.
4. Grupo novo? Crie `src/<grupo>/index.ts` e inclua em `src/index.ts`.

## Licença

MIT © Juliano Bazzi
