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

A única dependência de runtime é o [dayjs](https://day.js.org) (`^1.11.23`), instalado junto com o pacote. Nenhum plugin do dayjs é necessário — o fuso horário usa `Intl`.

## Uso

```ts
import {
  formatCurrency,
  formatDate,
  formatPhone,
  getToday,
  isValidCPF,
  pluralize,
  readQueryIds,
} from "@julianobazzi/utils";

formatDate("2024-01-02"); // "02/01/24"
formatDate("2024-01-02T02:00:00Z", { timeZone: "America/Sao_Paulo" }); // "01/01/24"
getToday({ timeZone: "America/Sao_Paulo" }); // "2026-07-21", mesmo num servidor em UTC
formatCurrency(1990); // "R$ 19,90" (centavos)
formatPhone("+55 11 98765-4321"); // "(11) 98765-4321"
isValidCPF("529.982.247-25"); // true
pluralize(0, "tarefa"); // "0 tarefas"
readQueryIds({ id: ["1,2", "2", "x"] }, "id"); // [1, 2]
```

CommonJS:

```js
const { onlyNumbers } = require("@julianobazzi/utils");

onlyNumbers("(11) 98765-4321"); // "11987654321"
```

## API

Todas as funções são exportadas de forma plana a partir da raiz do pacote, agrupadas internamente por finalidade.

### Valores ausentes e fallbacks

- **Ausente** é `null`, `undefined` ou `NaN` (e `±Infinity` nos formatadores de número). **Zero é valor**: sempre é formatado, nunca trocado pelo fallback.
- Funções que devolvem string aceitam `fallback` para entrada ausente. Padrões:

| Devolve quando a entrada falta | Funções |
| --- | --- |
| `""` | formatadores de data/hora, de documentos (`formatCPF`, `formatPhone`…), `formatAddress`, `build*Url`, durações, `formatNumber`, `numberToWords` |
| `"R$ 0,00"` / `"0%"` / `"0 Bytes"` / `"00:00:00"` | `formatCurrency` / `formatPercentage` / `formatBytes` / `formatSecondsToTime` |
| `"Não"` | `formatBoolean` |
| `0` | `roundInteger`, `toCents`, `precisionRound`, `safeDivide`, `percentOf`, `getAge` |
| `null` / `undefined` | `findOptionById`, `tryOrNull` / `parseJson`, `getOptionId`, `readQuery*` |
| `{ startDate: "", endDate: "" }` | `getDateRange`, `getMonthRange` (entrada inválida) |

### Nomes legados (saem na 2.0)

Continuam funcionando na 1.x; troque pela forma nova:

| Legado | Use |
| --- | --- |
| `formatHour` | `formatTime` |
| `formatInteger` | `roundInteger` |
| `formatEnvironment` | `normalizeEnvironment` |
| `formatDuration` | `formatMinutesToDuration` |
| `isMonday` … `isSunday` | `isDayOfWeek(value, 1)` … `isDayOfWeek(value, 0)` |
| opções `simplified` / `showSeconds` | `year` / `seconds` |
| argumentos posicionais de `formatCurrency`, `currencyToWords`, `formatPercentage`, `formatBytes`, `formatSecondsToTime`, `truncate`, `getLabelById` | o objeto de opções |

Na 2.0, `pad` passa a ter padrão `false` e `formatBytes`/`formatCompactNumber` passam a ter padrão `pt-BR`.

### formatting (formatação)

- `formatDate(value?, { year?, simplified?, fallback?, timeZone? })` — `DD/MM/YY`; `year: 'numeric'` → `DD/MM/YYYY`, `year: false` → `DD/MM`; data impossível (`2024-02-30`) → `fallback`
- `formatDateTime(date?, { year?, seconds?, simplified?, showSeconds?, fallback?, timeZone? })` — `DD/MM/YY HH:mm`; `year` como no `formatDate`, `seconds: true` acrescenta `:ss`; data inválida → `fallback`
- `formatMonth(value?, { fallback?, timeZone? })` — `MM/YYYY`; data inválida → `fallback`
- `getMonthName(value?, { short?, fallback?, casing?, timeZone? })` — nome do mês em PT-BR, ex.: `Julho` / `Jul`
- `getWeekDayName(value?, { short?, fallback?, casing?, timeZone? })` — nome do dia da semana em PT-BR, ex.: `Sábado` / `Sáb`
- `formatTime(value?, { seconds?, simplified?, fallback?, timeZone? })` — `HH:mm` (ou `HH:mm:ss`); também aceita hora pura (`"13:45:00"`); inválido → `fallback`
- `formatHour(...)` — nome legado do `formatTime` (sai na 2.0)
- `formatDateRange(start?, end?, { separator?, openEnd?, year?, fallback?, timeZone? })` — `01/01/24 a 31/01/24`; mesmo dia aparece uma vez; sem fim → texto de `openEnd` ou `fallback`
- `formatMinutesToDuration(minutes?, { fallback?, spaced? })` — duração legível, ex.: `1h e 30 min` (arredonda p/ minutos/segundos inteiros antes); `0` → `0s`, negativo mantém o sinal (`-1h e 30 min`)
- `formatSecondsToDuration(seconds?, { fallback?, spaced? })` — idem, a partir de segundos (≥60s arredonda p/ minutos)
- `formatDuration(minutes?, { fallback?, spaced? })` — **deprecated**, alias de `formatMinutesToDuration`
- `formatCurrency(value?, { divisor = 100, fallback? })` — moeda BRL, ex.: `R$ 19,90`; `0` é formatado, `fallback` só para ausente/não finito (posicional `(value, divisor, { fallback })` continua aceito)
- `formatCompactNumber(value?, { decimals?, locale?, fallback? })` — notação compacta, ex.: `1.5M`, `100K` (`locale: 'pt-BR'` → `1,5 mil`; padrão `en` até a 2.0)
- `formatPercentage(value?, { round?, decimals?, rounding?, fallback? })` — porcentagem pt-BR, ex.: `12,50%`, `1.234,50%`; `0` → `0,00%`; `rounding: 'floor'` mantém 99,6 em `99%` (posicional `(value, round, { fallback })` continua aceito)
- `formatBoolean(value?, { casing?, fallback? })` — `Sim` / `Não`; `fallback` cobre `null`/`undefined`
- `formatPhone(phone?, { fallback? })` — máscara de telefone BR (10 ou 11 dígitos); remove DDI `+55` e o `0` de tronco; `0800 123 4567` para números não geográficos
- `formatBytes(bytes?, { round?, locale?, casing?, fallback? })` — tamanho legível, ex.: `1.50 KB` (`locale: 'pt-BR'` → `1,50 KB`); negativo mantém o sinal (posicional `round` continua aceito)
- `formatSecondsToTime(value?, { seconds?, signed?, fallback? })` — `HH:mm:ss` (ou `HH:mm`); aritmética pura, horas passam de 24 (`90000` → `25:00:00`); `signed: 'negative'` mantém o sinal de menos (posicional `showSeconds` continua aceito)
- `formatTimeAgo(date?, { fallback? })` — tempo decorrido em PT, ex.: `5 dias`; data inválida → `fallback`, data futura → `1 minuto`
- `formatAddress(address, { fallback? })` — monta um endereço em uma linha (`rua, número - bairro, cidade - UF, CEP`); partes ausentes nunca deixam separador sobrando
- `formatCityAndState(city?, state?, { fallback?, separator?, casing? })` — `"Cidade - UF"`; faz trim nas partes (vazio quando ambos ausentes)
- `formatWeekDay(date?, { fallback?, casing?, dateFormat?, timeZone? })` — data + dia da semana abreviado, ex.: `15/6 - Sáb` (`dateFormat` default `D/M`); data inválida → `fallback`
- `getAge(birthDate?, { timeZone? })` — idade em anos completos (hoje); ausente/inválido/futuro → `0`
- `formatAge(birthDate?, { fallback?, timeZone? })` — idade em texto PT-BR, ex.: `"36 anos"` / `"1 ano"`
- `formatCPF(value?, { fallback?, pad? })` — `000.000.000-00` (completa com zeros, exceto com `pad: false`; > 11 dígitos → só dígitos)
- `formatCNPJ(value?, { fallback?, pad? })` — `00.000.000/0000-00` (suporta CNPJ alfanumérico; `pad: false` deixa entrada incompleta sem máscara)
- `formatDocument(value?, { fallback?, pad? })` — formata como CPF ou CNPJ conforme o tamanho
- `formatPostalCode(value?, { fallback?, pad? })` — CEP `00000-000` (> 8 dígitos → só dígitos)
- `formatPlate(value?, { fallback? })` — placa BR: antiga → `ABC-1234`, Mercosul mantém `ABC1D23`
- `formatPIS(value?, { fallback?, pad? })` — PIS/PASEP `000.00000.00-0` (> 11 dígitos → só dígitos)
- `formatLongDate(value?, { fallback?, casing?, timeZone? })` — data por extenso, ex.: `1º de julho de 2026`
- `numberToWords(value?, { fallback? })` — inteiro por extenso até trilhões, ex.: `mil duzentos e trinta e quatro`
- `currencyToWords(value?, { divisor = 100, fallback? })` — valor BRL por extenso (espelha `formatCurrency`), ex.: `dezenove reais e noventa centavos`
- `appendValue(base?, value?, { separator?, fallback?, casing? })` — junta dois textos (cada um com trim), ex.: `"a; b"`
- `applyCasing(value, casing?, { lowercaseWords? })` — `lowercase` / `uppercase` / `titlecase` (titlecase preserva o resto de cada palavra, ex.: `"KB"`; `lowercaseWords: ['de', 'da']` → `"João da Silva"`)
- `removeAccents(value?)` — remove acentos, ex.: `João` → `Joao`
- `onlyNumbers(value?)` — remove tudo que não for dígito
- `onlyAlphanumeric(value?, { casing? })` — remove acentos e não-alfanuméricos, depois uppercase (`"12.abc"` → `"12ABC"`, `"João"` → `"JOAO"`; `casing: 'none'` mantém a caixa)
- `formatWithPattern(value?, pattern?, { placeholder?, token? })` — máscara char-agnostic (`#` = próximo char), ex.: `'12345678900'` + `'###.###.###-##'` → `123.456.789-00`; `placeholder: '_'` completa o resto (`(11) 9____-____`)
- `truncate(value?, { length = 40, suffix = '...' })` — corta em `length` code points e adiciona `suffix` (posicional `length` continua aceito)
- `getLastCharacter(value?)` — último caractere de uma string
- `abbreviateName(name?, { casing? })` — primeiro nome + inicial do último sobrenome: `"Maria de Souza"` → `"Maria S."` (titlecase normaliza: `"JOAO SILVA"` → `"Joao S."`; entrada em branco → `""`)
- `getFirstAndLastWord(value?, { fallback?, casing? })` — mantém só a primeira e a última palavra: `"Analista de Sistemas"` → `"Analista Sistemas"`
- `joinByKey(values, key, dividerOrOptions?)` — junta uma propriedade de cada objeto, ignorando valores vazios; 3º arg é string (divider) ou `{ divider?, sort?, unique? }`, onde `sort` (`true | "asc" | "desc"`) ordena por `key` antes e `unique` remove duplicados
- `maskSecret(value?, { visibleStart = 5, visibleEnd = 5, mask = '••••••' })` — mascara parcialmente um segredo, mantendo as pontas visíveis, ex.: `$2y$1••••••lMnOp` (valores curtos → só a máscara; `visibleStart`/`visibleEnd` são limitados a ≥ 0, então `0` esconde aquele lado por completo)
- `slugify(value?)` — slug URL-safe (sem acento, minúsculo, hifenizado), ex.: `"São Paulo"` → `sao-paulo`
- `pluralize(count?, singular, plural | { plural?, showCount?, formatCount? })` — `0` → `"0 tarefas"`, `1` → `"1 tarefa"`; plural irregular pelo 3º arg (`"mês"`, `"meses"`); contagem ausente vale `0`
- `formatNumber(value?, { decimals?, minDecimals?, locale = 'pt-BR', fallback? })` — número com separadores do locale, ex.: `1234.5` → `1.234,5`
- `normalizeText(value?, { casing?, collapseWhitespace?, trim?, removeAccents? })` — texto para busca/comparação: `"  São   Paulo "` → `"sao paulo"`
- `formatList(items?, { limit?, conjunction = 'e', moreLabel?, fallback? })` — `"Ana, Bia e Caio"`; com `limit: 3` → `"a, b, c e mais 2"`
- `formatMilliseconds(ms?, { decimals = 1, showMinutes?, locale = 'pt-BR', fallback? })` — `2345` → `2,3s`; `showMinutes` → `1m 2,3s`
- `formatMailbox({ name?, address? }, { fallback? })` — `"Ana <ana@x.com>"` (só um lado quando o outro falta ou é igual)
- `buildMapsUrl(address?, { fallback? })` — link de busca do Google Maps para um endereço
- `sanitizeFileName(value?, { maxLength = 255, fallback?, removeAccents?, replacement = '-' })` — nome de arquivo seguro em qualquer SO (caracteres proibidos/de controle, pontos finais, nomes reservados como `CON`)
- `sanitizeNumeric(value?, { allowDecimal?, allowNegative? })` — mantém dígitos (mais o 1º `.`/`,` e um `-` inicial quando permitidos) para inputs numéricos; `"1.2,3"` → `"1.23"`
- `sanitizeSpreadsheetCell(value?)` — protege contra injeção de fórmula em CSV/Excel: prefixa `'` quando o valor começa com `= + - @` (também depois de espaços, ou tab/CR); número negativo puro (`-5`) fica como está
- `buildWhatsAppUrl(phone?, message?, { countryCode = '55', fallback? })` — link `wa.me`, ex.: `https://wa.me/5511987654321?text=...`; DDI já presente no número não é repetido; `countryCode: null` omite
- `buildPhoneUrl(phone?, { countryCode = '55', fallback? })` — link `tel:`, ex.: `tel:+5511987654321` (`countryCode: null` → `tel:11987654321`; `0800` nunca recebe DDI)
- `buildEmailUrl(email?, { subject?, body?, fallback? })` — link `mailto:` com `subject`/`body` opcionais (encodados); o endereço também é encodado (sem injeção de cabeçalhos via `?`/`&`)
- `buildInstagramUrl(username?, { fallback? })` — `https://instagram.com/<handle>` (remove `@` inicial; handle é encodado)
- `buildFacebookUrl(username?, { fallback? })` — `https://facebook.com/<handle>` (remove `@` inicial; handle é encodado)
- `buildLinkedInUrl(handle?, { type = 'profile', fallback? })` — `https://linkedin.com/in/...` ou `/company/...` (via `type`; handle é encodado)
- `normalizeEnvironment(value?)` — normaliza uma string de `NODE_ENV` para `production | homologation | development | test` (desconhecido → `production`)
- `formatEnvironment(...)` — nome legado do `normalizeEnvironment` (sai na 2.0)

Todos os `build*Url` devolvem `string | F`: passe `{ fallback: undefined }` para receber `undefined` quando o valor falta (pronto para um `href`).

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

- `buildQueryParams(params?, { ignore?, prefix?, skipEmpty? })` — serializa um objeto em query string; ignora `null`/`undefined` (e `""` com `skipEmpty`), expande arrays em chaves repetidas, escreve `Date` em ISO, retorna `""` quando vazio, ex.: `{ id: [1, 2] }` → `?id=1&id=2`
- `parseQueryParams(value?)` — o inverso; chaves repetidas viram array (o que `Object.fromEntries(new URLSearchParams(...))` perde). Aceita a string com ou sem `?` inicial; chaves de protótipo (`__proto__`, `constructor`, `prototype`) são ignoradas
- `buildQueryUrl(url, params, { ignore?, keepHash = true })` — altera a query de uma URL existente: cada chave substitui todas as suas ocorrências; `""`/`null`/`undefined`/`NaN`/data inválida/array vazio apagam a chave; `false` e `0` são gravados; o hash é mantido, ex.: `buildQueryUrl("/a?x=1#top", { x: 2 })` → `/a?x=2#top`
- `isSameQuery(a, b, { ignoreValueOrder? })` — compara duas queries pelo conteúdo (ordem das chaves, `+`/`%20` e `?` inicial não importam)
- `isRouteActive(pathname?, href, { exact? })` — `href` é a rota ativa? Casa por segmento (`/settings` em `/settings/profile`, não em `/settings-old`), ignora query/hash/barra final; `/` só casa exato

Leitores tipados que nunca lançam erro — valor ausente ou inválido volta `undefined` (ou `[]`), e o padrão vem com `??`. Aceitam qualquer origem de query: `URLSearchParams`, string, `query` do Pages Router ou `searchParams` do App Router (`QuerySource`).

- `readQueryString(query, key)` — primeiro valor não vazio (`?search=a&search=b` → `"a"`)
- `readQueryArray(query, key)` — todos os valores não vazios
- `readQueryNumber(query, key, { integer?, min?, max? })` — só decimal simples (rejeita `1e3`, `0x10`, `Infinity`); fora da faixa → `undefined`
- `readQueryBoolean(query, key)` — `true`/`1` → `true`, `false`/`0` → `false` (`?showAlert=false` nunca vira verdadeiro)
- `readQueryEnum(query, key, allowed)` — o valor só se estiver em `allowed`
- `readQueryDate(query, key)` — data `YYYY-MM-DD` real (`2026-02-30` → `undefined`)
- `readQueryIds(query, key, { max? })` — ids inteiros positivos de chaves repetidas e vírgulas, sem duplicados
- `readQueryRange(query, [startKey, endKey], fallback, { min?, max? })` — intervalo de datas com fallback por ponta; invertido é trocado e limitado a `[min, max]`

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

- `contains(value, items?)` — `true` se `value` está em `items` (aceita array readonly e `null`)
- `isOdd(value)` — `true` para números ímpares (trata negativos)
- `isValidJson(value?)` — `true` se a string é um JSON válido
- `isValidBarcode(value, { lengths? })` — `true` para dígito verificador EAN/GTIN válido; `lengths` restringe os tamanhos aceitos
- `isValidUrl(value)` — `true` para URL `http`/`https` válida
- `isSafeUrl(value?, { protocols?, allowRelative = true })` — `true` quando a URL é segura para um `href`: `http:`, `https:`, `mailto:`, `tel:` ou relativa; rejeita `javascript:`/`data:`, inclusive ofuscados como `java\tscript:`
- `isPositive(value?)` — `true` para número finito > 0
- `includesText(text?, search?)` — "contém" sem acento e sem caixa (`"sao"` acha `"São Paulo"`); busca vazia → `true`
- `isSameText(a?, b?, { ignoreAccents?, ignoreCase?, collapseWhitespace? })` — comparação frouxa para diálogos "digite para confirmar"; lado vazio nunca casa
- `hasRole(current, allowed?)` — checagem de papel no servidor ou cliente: sem usuário → `false`, sem `allowed` → `true`, `allowed: []` → `false`
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
- `isValidUF(value?)` — `true` para sigla de estado BR válida (case-insensitive); o tipo `UF` (união das siglas) é exportado
- `isValidPlate(value?)` — `true` para placa BR (antiga `AAA9999` ou Mercosul `AAA9A99`)
- `isValidPIS(value?)` — `true` para PIS/PASEP com dígito verificador válido
- `isValidRenavam(value?)` — `true` para RENAVAM válido (11 dígitos ou legado 9–10)
- `isValidCNH(value?)` — `true` para CNH com dígitos verificadores válidos (algoritmo Denatran)
- `isValidVoterId(value?)` — `true` para título de eleitor válido (UF + dígitos, com exceção SP/MG)
- `isValidBoleto(value?)` — `true` para linha digitável de boleto válida (bancário ou arrecadação)

### number (números)

- `precisionRound(value?, precision = 2)` — arredonda para N casas decimais sem surpresas de ponto flutuante (`1.005` → `1.01`), simétrico nos negativos (`-1.005` → `-1.01`)
- `roundInteger(value?, { fallback? })` — arredonda para o inteiro mais próximo; `0` é valor, `fallback` só para ausente/não finito
- `formatInteger(...)` — nome legado do `roundInteger` (sai na 2.0)
- `toPositive(value?)` — limita a um valor não negativo
- `getRandomInt(min = 1, max = 100)` — inteiro aleatório no intervalo (inclusivo)
- `percentOf(part?, total?, { fallback = 0 })` — `part / total * 100` sem `NaN`/`Infinity`; total ≤ 0 → `fallback`
- `fitWithin(width, height, maxEdge)` — reduz um tamanho para a maior borda caber, mantendo a proporção (nunca amplia), ex.: `(4000, 3000, 1000)` → `{ width: 1000, height: 750 }`
- `safeDivide(value1?, value2?, { allowNegativeDivisor?, fallback? })` — divide; `fallback` (0) quando o divisor é ≤ 0 ou ausente, ou o numerador é ausente/não finito
- `toCents(value?)` — valor → centavos inteiros, ex.: `19.9` → `1990`, `1.005` → `101` (inverso de `formatCurrency`)
- `parseCurrencyToCents(value?)` — string de moeda → centavos inteiros, detectando o separador decimal, ex.: `"R$ 1.234,56"` → `123456`, `"1.5"` → `150`, `"1.500"` → `150000`

### object (objetos)

- `getProperty(obj, key)` — acesso a propriedade com tipagem segura
- `omitFields(obj, keys)` — cópia rasa sem as `keys`
- `getOptionId(option?)` — extrai o `id` de uma opção/entidade
- `getListIds(list?)` — mapeia uma lista de entidades para seus `id`s
- `findOptionById(options?, value?)` — acha a opção cujo id casa com `value` (compara como string; aceita ids numéricos e `0`), ou `null`
- `findOptionsByIds(options?, value?)` — mapeia cada id de `value` p/ sua opção, descartando sem match
- `getLabelById(options?, value?, { key = "name", fallback = "" })` — campo da opção como string pelo id, ou `fallback` (posicional `key, fallback` continua aceito)
- `maskFields(value, fields, { mask? })` — clona em profundidade mascarando os campos string listados, em qualquer nível (default `maskSecret`)
- `isEqualIgnoringKeys(a, b, keys)` — comparação estrutural ignorando `keys` em qualquer profundidade (ordem de chave irrelevante, ordem de array significativa)
- `swapAtIndex(list, index, offset)` — troca dois itens de forma imutável; fora dos limites devolve a mesma referência
- `updateAtIndex(list, index, updater)` — cópia da lista com só o item de `index` substituído
- `getFirstFieldError(errors)` — primeiro erro aninhado com `message` numa árvore de erros estilo react-hook-form, como `{ name: 'items.0.price', message }` (pronto p/ `setFocus`)

### parse (conversão)

- `parseIds(values[], { positive?, unique? })` / `parseIds(...ids)` — strings de ids separadas por vírgula → `number[]` (com trim; entradas vazias e não inteiras são descartadas, então `"1,,2"` → `[1, 2]`); a forma com array descarta `0`/negativos com `positive` e repetidos com `unique`
- `resolveIdsToObjects(ids?, resolver, params?)` — resolve uma lista de ids em objetos via resolver async (em paralelo)
- `resolveList(value?, resolver, params?, { skipErrors? })` — `parseIds` + `resolveIdsToObjects`; aceita string ou array de strings; `skipErrors` omite ids cujo resolver rejeita
- `resolveId(value?, resolver, params?)` — resolve o 1º id válido em objeto, ou `null`
- `parseJson<T>(value?)` — `JSON.parse` que devolve `undefined` em vez de lançar (`"null"` parseado continua `null`)
- `toArray(value?)` — embrulha um valor único num array ou copia um array, descartando `null`/`undefined` (`toArray(undefined)` → `[]`, diferente do `castArray` do lodash)
- `getMimeType(fileName?, fallback = 'application/octet-stream')` — MIME type pela extensão (imagens incl. webp/bmp/avif, documentos, Office, áudio, vídeo); ignora `?query`/`#hash`
- `getFileKind(fileName?)` — `'image' | 'pdf' | 'audio' | 'video' | 'office' | 'email' | 'markdown' | 'text' | 'other'`; ignora `?query`/`#hash`
- `hasExtension(fileName?, extensions)` — checagem de extensão sem diferenciar maiúsculas (com ou sem ponto); ignora `?query`/`#hash`
- `toStringArray(value, { wrap? })` — reduz um valor desconhecido a `string[]`, descartando entradas de outros tipos; não-array → `[]` (`wrap: true` transforma `"a"` em `["a"]`)
- `getFileExtension(value?)` — extensão de um caminho/URL sem o ponto; ignora `?query`/`#hash` e host com ponto, dotfiles → `""`
- `parseInlineMarkup(value?, { boldMarker?, italicMarker? })` — markup estilo WhatsApp `*negrito*`/`_itálico_` (aninhável) → `{ text, bold?, italic? }[]`

### transform

- `diffLines(before?, after?)` — diff linha a linha (maior subsequência comum) devolvendo `{ beforeLines, afterLines }`, com cada linha marcada em `changed`
- `stripInlineMarkup(value?, { boldMarker?, italicMarker? })` — texto puro sem os marcadores `*`/`_`, pronto p/ `truncate`, meta tags ou e-mail
- `bytesToBase64(bytes)` — base64 de um `Uint8Array`, em blocos (seguro para buffers grandes)
- `toDataUrl(mimeType, bytesOrBase64)` — `data:<mime>;base64,...`

Os demais são transforms dependency-free no formato `(value, originalValue) => …` (igual ao `yup.transform`); embrulham as funções base.

- `onlyNumbersTransform(_value, originalValue)` — embrulha `onlyNumbers`, ex.: `yup.string().transform(onlyNumbersTransform)`
- `onlyAlphanumericTransform(_value, originalValue)` — embrulha `onlyAlphanumeric`, ex.: `yup.string().transform(onlyAlphanumericTransform)`
- `currencyTransform(_value, originalValue, { divisor = 100 })` — para inputs em centavos: `"R$ 1.234,56"` → `1234.56`, número `1990` → `19.9`; vazio → `null` (funciona com `.nullable()`/`.required()`); mantém o sinal de menos. Retorna `number | null`.

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

### async

- `sleep(ms, { signal? })` — espera `ms`; signal abortado rejeita na hora com `signal.reason`, e o listener de abort sempre é removido
- `retry(fn, { attempts = 3, delayMs = 0, signal?, shouldRetry?, onRetry? })` — roda `fn({ attempt, signal })` até dar certo; `delayMs` pode ser `(attempt, error) => ms`; se todas as tentativas falharem, rejeita com `RetryError` (`attempts`, `cause`); abort e erros recusados por `shouldRetry` são relançados como estão
- `tryOrNull(fn, { when? })` — devolve `null` em vez de rejeitar; restrinja com `when` (ex.: só 404) para não esconder falhas
- `settle(promiseOrFn)` — `{ ok: true, value }` ou `{ ok: false, error }`, nunca rejeita
- `onceAsync(fn)` — `{ run, reset }`: todo `run()` compartilha a mesma promise; falha limpa (sem apagar uma carga nova iniciada depois do `reset()`)

### http

Helpers estruturais para erros de API — sem depender do axios.

- `getHttpStatus(error)` — `error.response.status`, `error.status` ou `error.statusCode`, senão `undefined`
- `getErrorMessage(error, { fallback? })` — `response.data.message` da API, senão `error.message`, senão a própria string
- `getValidationErrors(error, { status = 422 })` — `{ message?, errors: { campo: string[] } }` no formato do Laravel, ou `null` para outros status
- `applyValidationErrors(errors, setError, { fieldMap?, fields?, type = 'server' })` — joga a 1ª mensagem de cada campo no `setError` do react-hook-form (estrutural); campos fora de `fields` vão para `unhandled` e não contam como tratados
- `readResponseWithProgress(response, { signal?, onProgress?, stepBytes? })` — lê o corpo de um `fetch` em `Blob` com progresso; `total` é `0` quando desconhecido ou excedido (resposta comprimida)

### cache

- `createTtlCache({ ttlMs, maxEntries?, now? })` — cache em memória com expiração: `get`, `set`, `has`, `delete`, `clear` e `getOrSet(key, load)`, que deduplica cargas em andamento e não guarda nada em caso de falha

### server

Helpers puros para `getServerSideProps`, Server Components e route handlers — tipos estruturais, sem importar `next`.

- `redirectTo(destination, permanent = false)` — `{ redirect: { destination, permanent } }`
- `getCookie(name, source?)` — lê um cookie de uma string de header `Cookie`, de uma requisição (`IncomingMessage` ou `Headers`) ou de um store `cookies()`; sem `source`, `document.cookie` no navegador
- `readJsonCookie(name, source?)` — `getCookie` + `parseJson`; ausente/inválido → `null`
- `createServerTiming()` — `{ measure(name, fn), header(), apply(res) }` para enviar o header `Server-Timing` (a duração é registrada mesmo quando `fn` lança)

### browser (somente DOM)

- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `readFileAsDataURL(file)` — `Promise<string>` com a `data:` URL de um `File`/`Blob`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>` (extensão pelo nome, senão pelo MIME, senão `jpeg`)
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (largura > altura)
- `isNotificationsSupported()` — verifica suporte a web push (`false` em SSR)
- `openInNewTab(url?, { target?, features? })` — `window.open` com `noopener,noreferrer` sempre aplicado; devolve `null` em SSR e, por causa do `noopener`, normalmente mesmo quando a aba abriu
- `downloadBlob(blob, fileName)` — dispara o download de um arquivo e revoga o object URL 1 s depois (seguro no Safari)
- `downloadJson(data, fileName, { space? })` — serializa em JSON e baixa (indentado por default)
- `resizeImage(file, { maxEdge, quality = 0.9, mimeType = 'image/jpeg', output = 'blob' | 'dataUrl' })` — reduz uma imagem para a maior borda caber em `maxEdge` (nunca amplia); sempre termina (rejeita se falhar ao decodificar/codificar)
- `captureVideoFrame(video, { maxEdge?, quality = 0.75, mimeType?, mirror? })` — frame atual de um `<video>` como `data:` URL (lança erro sem frame)
- `stopMediaStream(stream?)` — para todas as tracks de um stream de câmera/microfone
- `getNetworkInfo()` — `{ isOnline, connectionType, effectiveType, downlink, rtt, saveData }` da Network Information API; seguro em SSR

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
