import dotenv from "dotenv";

const isRunningJest = (): boolean => process.env.JEST_WORKER_ID !== undefined;
isRunningJest() ? dotenv.config({ path: "jest.env" }) : dotenv.config();

const getRequiredEnv = (envVarKey: string): string => {
  const envVarVal = process.env[envVarKey];
  if (!envVarVal) {
    throw new Error(`Unable to load environment variable ${envVarKey}.`);
  }
  return envVarVal;
};

export default {
  port: Number(process.env.PORT) || 8147,
  nodeEnv: getRequiredEnv("NODE_ENV"),
  mongoUrl: getRequiredEnv("MONGO_URL"),
  mongoDbName: getRequiredEnv("MONGO_DB_NAME"),
};
