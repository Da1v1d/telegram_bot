import dotenv from "dotenv";

const env = process.env.NODE_ENV ?? "development";
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

export const ROUTES = {
  USERS: "/users",
} as const;

export const ENV_VARIABLES = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
} as const;
