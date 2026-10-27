import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import envSchema from './src/schema/env.schema.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error('\n\x1b[31m%s\x1b[0m', '❌ Invalid environment variables:');
    for (const issue of result.error.issues) {
      console.error(`  - \x1b[33m${issue.path.join('.')}\x1b[0m: ${issue.message}`);
    }
    console.error('');
    process.exit(1);
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
    server: {
      port: result.data.VITE_APP_PORT,
    },
    resolve: {
      alias: {
        '@': `${import.meta.dirname}/src`,
      },
    },
  };
});
