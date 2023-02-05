import { getDbClient } from "../../../connection";

export const deleteWithCondition = async (
  condition: string,
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
    const sql = `DELETE FROM ${tableName} WHERE ${condition}`;

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
