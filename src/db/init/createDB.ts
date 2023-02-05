import { getDbClient } from "../connection";

export const createDb = async (dbName: string) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
    client.query(query);
  } catch (error) {
    console.log(error);
  }
};
