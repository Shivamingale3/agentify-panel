import envSchema, { type Env } from '@/schema/env.schema';

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.issues);
  throw new Error('Invalid environment variables');
}

export const env: Env = parsed.data;
export default env;
