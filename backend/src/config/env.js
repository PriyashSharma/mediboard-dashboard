import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .regex(/^\d+$/)
    .default('5000'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required in the environment'),
  CORS_ORIGIN: z.string().default('*'),
})

const parsedEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
})

export const env = {
  ...parsedEnv,
  PORT: Number(parsedEnv.PORT),
}
