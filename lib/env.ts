import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        POSTGRES_PRISMA_URL: z.string().min(1),
        POSTGRES_URL_NON_POOLING: z.string().optional(),
        AUTH_GITHUB_ID: z.string().min(1),
        AUTH_GITHUB_SECRET: z.string().min(1),
        AUTH_SECRET: z.string().min(1),
        NODE_ENV: z.enum(["development", "production"]),
        EMAIL_SERVER: z.string().optional(),
        EMAIL_FROM: z.string().optional(),

    },
    client: {
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        AUTH_SECRET: process.env.AUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        EMAIL_SERVER: process.env.EMAIL_SERVER,
        EMAIL_FROM: process.env.EMAIL_FROM,
    },
    // For Next.js >= 13.4.4, you only need to destructure client variables:
    // experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // }
});