import * as z from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_PANDA_SCORE_API_BASE_URL: z.string(),
  EXPO_PUBLIC_PANDA_SCORE_API_TOKEN: z.string(),
});

const envValidation = envSchema.safeParse({
  EXPO_PUBLIC_PANDA_SCORE_API_BASE_URL:
    process.env.EXPO_PUBLIC_PANDA_SCORE_API_BASE_URL,
  EXPO_PUBLIC_PANDA_SCORE_API_TOKEN: process.env.EXPO_PUBLIC_PANDA_SCORE_API_TOKEN,
});

if (envValidation.error) {
  throw new Error(JSON.stringify(envValidation.error, null, 2));
}

export const Env = envValidation.data;
