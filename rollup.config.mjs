import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/better-weather-card.ts',
  output: {
    file: 'dist/better-weather-card.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      declaration: false,
      declarationMap: false,
    }),
    json(),
    terser(),
  ],
};
