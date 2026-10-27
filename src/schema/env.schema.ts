import z from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: requiredString({ name: 'API Base URL' }),
  VITE_APP_PORT: requiredNumber({ name: 'App Port', min: 0, max: 65535 }).default(5173),
});

function requiredString({ name, min, max }: { name: string; min?: number; max?: number }) {
  let schema = z.string().min(1, `${name} is required`);
  if (min !== undefined) {
    schema = schema.min(min, `${name} must be at least ${min} characters`);
  }
  if (max !== undefined) {
    schema = schema.max(max, `${name} must be at most ${max} characters`);
  }
  return schema;
}

function requiredNumber({ name, min, max }: { name: string; min?: number; max?: number }) {
  return z
    .string()
    .min(1, `${name} is required`)
    .or(z.number())
    .transform((val, ctx) => {
      const num = typeof val === 'number' ? val : Number(val);
      if (Number.isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${name} must be a valid number`,
        });
        return z.NEVER;
      }
      if (min !== undefined && num < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${name} must be at least ${min}`,
        });
        return z.NEVER;
      }
      if (max !== undefined && num > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${name} must be at most ${max}`,
        });
        return z.NEVER;
      }
      return num;
    });
}

export type Env = z.infer<typeof envSchema>;
export default envSchema;
