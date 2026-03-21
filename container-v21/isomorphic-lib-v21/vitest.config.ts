import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['dist/**/*.test.js'],

    exclude: ['**/node_modules/**'],
  },
});
