import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts', core: 'src/core.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020',
  // React gehört der Anwendung (peerDependency), nicht dem Paket
  external: ['react', 'react-dom'],
});
