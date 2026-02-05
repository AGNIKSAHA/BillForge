import dotenv from "dotenv";

dotenv.config();



const required = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not defined`);
  }

  return value.trim();
};

const requiredNumber = (key: string): number => {
  const raw = process.env[key];

  if (!raw) {
    throw new Error(`${key} is not defined`);
  }

  const num = Number(raw);

  if (Number.isNaN(num)) {
    throw new Error(`${key} must be a valid number`);
  }

  return num;
};

const requiredURL = (key: string): string => {
  const value = required(key);

  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`${key} must be a valid URL`);
  }
};

const getNodeEnv = (): "development" | "production" | "test" => {
  const env = process.env.NODE_ENV ?? "development";

  if (!["development", "production", "test"].includes(env)) {
    throw new Error("NODE_ENV must be development | production | test");
  }

  return env as "development" | "production" | "test";
};



export const ENV = Object.freeze({


  PORT: process.env.PORT ? requiredNumber("PORT") : 5000,
  NODE_ENV: getNodeEnv(),


  MONGO_URI: required("MONGO_URI"),


  JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),


  JWT_ACCESS_EXPIRES: requiredNumber("JWT_ACCESS_EXPIRES"),
  JWT_REFRESH_EXPIRES: requiredNumber("JWT_REFRESH_EXPIRES"),

  COOKIE_SECRET: required("COOKIE_SECRET"),


  EMAIL_SERVICE: required("EMAIL_SERVICE"),
  EMAIL_USER: required("EMAIL_USER"),
  EMAIL_PASS: required("EMAIL_PASS"),


  EMAIL_VERIFY_TOKEN_EXPIRE: required("EMAIL_VERIFY_TOKEN_EXPIRE"),
  RESET_PASSWORD_TOKEN_EXPIRE: required("RESET_PASSWORD_TOKEN_EXPIRE"),


  CLIENT_URL: requiredURL("CLIENT_URL"),


  APP_NAME: process.env.APP_NAME ?? "FreelanceFlow"

} as const);


export const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
