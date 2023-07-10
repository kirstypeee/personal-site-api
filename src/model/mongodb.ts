import { Db, MongoClient } from "mongodb";

import config from "../shared/config";

const dbUrl = config.mongoUrl;
const dbName = config.mongoDbName;

const client = MongoClient.connect(dbUrl, {
  maxPoolSize: 20,
});

export const dbConnection = async (): Promise<Db> => {
  const connectedClient = await client;
  return connectedClient.db(dbName);
};
