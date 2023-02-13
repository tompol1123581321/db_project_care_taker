import { AdditionalFilterParameters } from "../../../../models";
import { getDbClient } from "../../connection";
import { getAdditionalFilterParametersQuery } from "./utils";

export const getCountFromAllTables = async (
  cb: (value: Array<{ count: number }>) => void,
  searchQuery: string = "",
  additionalFilterParameters?: AdditionalFilterParameters
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query =
      "SELECT COUNT(*) as count FROM flats INNER JOIN buildings ON flats.buildingId = buildings.buildingId " +
      "INNER JOIN flatTypes ON flats.flatTypeId = flatTypes.flatTypeId " +
      "INNER JOIN owners ON flats.ownerId = owners.ownerId " +
      `WHERE (name  LIKE '%${searchQuery}%' OR email LIKE '%${searchQuery}%' OR ownerAddress LIKE '%${searchQuery}%' OR buildingAddress LIKE '%${searchQuery}%')` +
      getAdditionalFilterParametersQuery(additionalFilterParameters);

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
