import { getDbClient } from "../../connection";

export const getAvgOfFlatsPerBuilding = async (cb: (value: number) => void) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query =
      "SELECT COUNT()  FROM buildings INNER JOIN owners ON owners.ownerId = representativeId";

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
