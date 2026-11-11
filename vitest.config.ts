import { defineConfig } from 'vitest/config';

// Pin the runtime time zone so date tests never depend on the machine or CI
// clock. Vitest's forked workers inherit it. Override with `TZ=UTC pnpm test`
// to check that time-zone-aware helpers really are machine-independent.
process.env.TZ ??= 'America/Sao_Paulo';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/index.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
        branches: 100,
      },
    },
  },
});
