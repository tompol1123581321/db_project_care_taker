import { getDbClient } from "../../../connection";

export const getWithCondition = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  cb: (value: Array<Record<string, unknown>>) => void,
  condition: string,
  cols?: Array<string>
) => {
  try {
    const sql = `SELECT ${
      cols?.length ? cols.join(", ") : "*"
    } FROM ${tableName} WHERE ${condition}`;

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
