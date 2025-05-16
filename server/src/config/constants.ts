import dotenv from "dotenv";
import { getEnvVariable } from "../utils/helpers";

const env = process.env.NODE_ENV ?? "development";
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

export const ROUTES = {
  USERS: "/users",
  AUTH: "/auth",
} as const;

export const ENV_VARIABLES = {
  PORT: getEnvVariable("PORT"),
  NODE_ENV: getEnvVariable("NODE_ENV"),
  CORS_ORIGIN: getEnvVariable("CORS_ORIGIN"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  JWT_ACCESS_SECRET: getEnvVariable("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnvVariable("JWT_REFRESH_SECRET"),
  ACCESS_TOKEN_EXPIRES_IN: getEnvVariable("ACCESS_TOKEN_EXPIRES_IN"),
  REFRESH_TOKEN_EXPIRES_IN: getEnvVariable("REFRESH_TOKEN_EXPIRES_IN"),
} as const;
