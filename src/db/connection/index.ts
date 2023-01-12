import mySql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const authInfo = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

let dbClient: mySql.Connection;
const connectToDb = async () => {
  try {
    dbClient = await mySql.createConnection(authInfo);
    dbClient.connect();
    console.log("successfully connected to DB");
  } catch (error) {
    console.log("connection failed", error);
    throw new Error("Connection to db failed");
  }
};

const getDbClient = () => {
  if (!dbClient) {
    return;
  }
  return dbClient;
};

export { connectToDb, getDbClient };
