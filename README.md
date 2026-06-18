# @julianobazzi/utils

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
- `formatDate(value?, simplified = true)` — `DD/MM/YY` (ou `DD/MM/YYYY`)
- `formatDateTime(date?, simplified = true)` — `DD/MM/YY HH:mm` (ou `DD/MM/YYYY HH:mm`)
- `formatMonth(value?)` — `MM/YYYY`
- `formatHour(value?)` — `HH:mm`
- `formatDuration(minutes?)` — duração legível, ex.: `1h e 30 min`
- `formatCurrency(value?, divisor = 100)` — moeda BRL, ex.: `R$ 19,90`
- `formatBoolean(value?)` — `Sim` / `Não`
- `formatPhone(phone?)` — máscara de telefone BR (10 ou 11 dígitos)
- `formatBytes(bytes?, round = false)` — tamanho legível, ex.: `1.50 KB`
- `formatSecondsToTime(value?, showSeconds = true)` — `HH:mm:ss` (ou `HH:mm`)
- `formatTimeAgo(date?)` — tempo decorrido em PT, ex.: `5 dias`
- `formatAddress(address)` — monta um endereço em uma linha
- `formatCityAndState(city?, state?)` — `"Cidade - UF"` (ou `"Não Informado"`)
- `formatWeekDay(date?)` — data + dia da semana abreviado, ex.: `15/6 - Sáb`
- `formatCPF(value?)` — `000.000.000-00`
- `formatCNPJ(value?)` — `00.000.000/0000-00` (suporta CNPJ alfanumérico)
- `formatDocument(value?)` — formata como CPF ou CNPJ conforme o tamanho
- `formatPostalCode(value?)` — CEP `00000-000`
- `removeAccents(value?)` — remove acentos, ex.: `João` → `Joao`
- `onlyNumbers(value?)` — remove tudo que não for dígito
- `truncate(value?, length = 40)` — corta o texto e adiciona `...`
- `getLastCharacter(value?)` — último caractere de uma string
- `abbreviateName(name?)` — `"John Smith"` → `"John S."`
- `joinByKey(values, key, divider = " | ")` — junta uma propriedade de cada objeto

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

### number (números)
- `precisionRound(value?, precision = 2)` — arredonda para N casas decimais
- `formatInteger(value?)` — arredonda para o inteiro mais próximo
- `generateOTP(length = 6)` — gera um OTP numérico aleatório
- `toPositive(value?)` — limita a um valor não negativo
- `getRandomInt(min = 1, max = 100)` — inteiro aleatório no intervalo (inclusivo)
- `safeDivide(value1, value2?)` — divide; 0 quando o divisor é ≤ 0 ou ausente

### object (objetos)
- `getProperty(obj, key)` — acesso a propriedade com tipagem segura
- `omitFields(obj, keys)` — cópia rasa sem as `keys`
- `getOptionId(option?)` — extrai o `id` de uma opção/entidade
- `getListIds(list?)` — mapeia uma lista de entidades para seus `id`s

### parse (conversão)
- `parseIds(...ids)` — strings de ids separadas por vírgula → `number[]`

### browser (somente DOM)
- `loadImageFromBlob(blob)` — `Promise<HTMLImageElement>`
- `getImageDimensions(file)` — `Promise<{ width, height, extension }>`
- `isPhotoLandscape(fileOrUrl)` — `Promise<boolean>` (largura > altura)
- `isNotificationsSupported()` — verifica suporte a web push

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run build` | Empacota em `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev` | Build em modo watch |
| `npm run test` | Roda os testes uma vez (Vitest) |
| `npm run test:watch` | Roda os testes em modo watch |
| `npm run typecheck` | Checagem de tipos com `tsc --noEmit` |
| `npm run lint` | Lint + checagem de formatação (Biome) |
| `npm run lint:fix` | Aplica correções seguras de lint/formatação |

## Adicionando um utilitário

1. Crie `src/<grupo>/<nome>.ts` com um export nomeado (`export function <nome>`).
2. Adicione `src/<grupo>/<nome>.test.ts` com testes Vitest.
3. Reexporte no barrel do grupo `src/<grupo>/index.ts`.
4. Grupo novo? Crie `src/<grupo>/index.ts` e inclua em `src/index.ts`.

## Versionamento e publicação

Este repositório usa [Changesets](https://github.com/changesets/changesets):

```bash
npx changeset      # registra uma mudança
```

Ao fazer merge na `master`, o workflow de Release abre um PR de versão; ao mergear esse PR, o pacote é publicado no npm.
Requer o secret de repositório `NPM_TOKEN`.

## Licença

MIT © Juliano Bazzi
