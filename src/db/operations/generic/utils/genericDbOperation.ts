import { getDbClient } from "../../../connection";

export const genericDbOperation = async (
  query: string,
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
    const client = getDbClient();
    if (!client) return;

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
