import { getDbClient } from "../../../connection";

export const insertSingleRow = async (
  sql: string,
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
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
