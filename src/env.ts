import { z } from 'zod';

const envSchema = z.object({
  // DB_HOST: z.string().url(),
  // DB_PORT: z.string(),
  // DB_USERNAME: z.string(),
  // DB_PASSWORD: z.string(),
  TWOCAPTCHA_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
