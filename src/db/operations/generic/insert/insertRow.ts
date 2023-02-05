import { getDbClient } from "../../../connection";

export const insertSingleRow = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  definition: string,
  values: string,
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
    const sql = `INSERT INTO ${tableName} (${definition}) VALUES (${values})`;

    const client = getDbClient();
    if (!client) return;

    await client.query(sql, (error, res) => {
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
