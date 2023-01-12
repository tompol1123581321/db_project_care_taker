import { getDbClient } from "../../../connection";

export const getWithFunctionCondition = async (
  tableName: "buildings" | "flats" | "flatTypes" | "owners",
  cb: (value: Array<Record<string, unknown>>) => void,
  condition: string,
  funcExpression: string
) => {
  try {
    const sql = `SELECT ${funcExpression} FROM ${tableName} WHERE ${condition}`;

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
