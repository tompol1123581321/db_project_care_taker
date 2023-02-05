import { getDbClient } from "../../connection";
import {
  AdditionalFilterParameters,
  CompleteFlatItem,
  SortParameters,
} from "./types";
import { getAdditionalFilterParametersQuery } from "./utils";

export const getAllFromAllTables = async (
  cb: (value: Array<CompleteFlatItem>) => void,
  page: number = 1,
  sortParams: SortParameters = {
    direction: "DESC",
    key: "flatId",
  },
  searchQuery: string = "",
  additionalFilterParameters?: AdditionalFilterParameters
) => {
  try {
    const client = getDbClient();
    if (!client) return;
    const query =
      "SELECT * FROM flats INNER JOIN buildings ON flats.buildingId = buildings.buildingId " +
      "INNER JOIN flatTypes ON flats.flatTypeId = flatTypes.flatTypeId " +
      "INNER JOIN owners ON flats.ownerId = owners.ownerId " +
      `WHERE (name  LIKE '%${searchQuery}%' OR email LIKE '%${searchQuery}%' OR ownerAddress LIKE '%${searchQuery}%' OR buildingAddress LIKE '%${searchQuery}%')` +
      getAdditionalFilterParametersQuery(additionalFilterParameters) +
      `ORDER BY ${sortParams.key} ${sortParams.direction} LIMIT ${
        (page - 1) * 10
      }, 10`;
    console.log(query);

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
