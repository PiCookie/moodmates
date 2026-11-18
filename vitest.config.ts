import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // test-dist braucht ein gebautes dist und läuft über vitest.dist.config.ts (pnpm test:dist)
    include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
  },
});
