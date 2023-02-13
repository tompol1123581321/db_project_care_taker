import { AgregatedBuilding } from "../../../../models";
import { getDbClient } from "../../connection";

export const getBuildingInfoWithRepresentative = async (
  cb: (value: Array<AgregatedBuilding>) => void
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query =
      "SELECT name, email, buildingAddress, buildingId, ownerId, buildDate  FROM buildings INNER JOIN owners ON owners.ownerId = representativeId";

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
