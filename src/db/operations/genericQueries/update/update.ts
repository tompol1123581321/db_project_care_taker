import { getDbClient } from "../../../connection";

export const updateWithCondition = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  updates: Array<{ column: string; value: string | number }>,
  cb: (value: Array<Record<string, unknown>>) => void,
  condition: string
) => {
  try {
    const sql = `UPDATE ${tableName} SET ${updates
      .map((update) => `${update.column} = ${update.value}`)
      .join(", ")} WHERE ${condition}`;

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
