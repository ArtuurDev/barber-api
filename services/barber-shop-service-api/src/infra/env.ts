import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number(),
    SECRET_TOKEN_JWT: z.string(),
    CLOUD_FLARE_ID: z.string(),
    ACCESS_KEY_CLOUD_FLARE: z.string(),
    SECRET_KEY_CLOUF_FLARE: z.string(),
    BUCKET_NAME: z.string(),
    SECRET_TOKEN_JWT_EMAIL: z.string(),
    // SECRET_TOKEN_JWT_FROM_CREATE_ACCONT: z.string()
})

export type Env = z.infer<typeof envSchema> 