import { getDbClient } from "../../../connection";

export const getAllFromTable = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query = `SELECT * FROM ${tableName}`;

    await client.query(query, (error, res) => {
      if (error) {
        throw error;
      } else {
        cb(res);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
