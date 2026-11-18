import { defineConfig } from 'vitest/config';

// Prüft das gebaute Paket (dist). Läuft nach `pnpm build`, nicht im normalen Testlauf.
export default defineConfig({
  test: { environment: 'node', include: ['test-dist/**/*.test.ts'] },
});
