# @julianobazzi/utils

A collection of small, tree-shakeable TypeScript utility functions. Ships ESM + CJS with bundled type definitions.

## Install

```bash
npm install @julianobazzi/utils
```

## Usage

```ts
import { capitalize } from "@julianobazzi/utils";

capitalize("hello"); // "Hello"
```

CommonJS:

```js
const { capitalize } = require("@julianobazzi/utils");
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Bundle to `dist/` (ESM + CJS + `.d.ts`) via tsup |
| `npm run dev` | Build in watch mode |
| `npm run test` | Run tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run lint` | Lint + format check (Biome) |
| `npm run lint:fix` | Apply safe lint/format fixes |

## Adding a utility

1. Create `src/<group>.ts` with exported functions.
2. Add `src/<group>.test.ts` with Vitest tests.
3. Re-export from `src/index.ts`.

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets):

```bash
npx changeset      # record a change
```

On merge to `master`, the Release workflow opens a version PR; merging it publishes to npm.
Requires an `NPM_TOKEN` repository secret.

## License

MIT © Juliano Bazzi
