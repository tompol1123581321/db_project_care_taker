import { getDbClient } from "../../connection";

export const createTable = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  definition: string,
  hasForeignKey?: boolean
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query = `CREATE TABLE ${tableName} (${definition})${
      hasForeignKey ? " ENGINE=INNODB" : ""
    }`;
    client.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
