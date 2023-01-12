import { getDbClient } from "../../connection";

export const populateTable = async (
  sql: string,
  data: Array<Array<unknown>>
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    await client.query(sql, [data], (err, result) => {
      if (err) throw err;
      console.log("result pop: " + result);
    });
  } catch (error) {
    console.log(error);
  }
};
