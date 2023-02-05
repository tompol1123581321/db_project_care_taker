import { Request, RequestHandler } from "express";
import {
  getAllFromAllTables,
  SortParameters,
  TableParams,
} from "../../db/operations/aggregatedTable";

const getTableDataQueryParams = (req: Request): TableParams | undefined => {
  const {
    key,
    direction,
    searchQuery,
    page,
    buildingId,
    size,
    rented,
    flatId,
  } = req.query;
  if (key && direction && page) {
    const sortParams = { key, direction } as SortParameters;
    const additionalFilterParameters = {};
    if (rented !== undefined) {
      Object.assign(additionalFilterParameters, {
        rented: `"${String(rented)}"`,
      });
    }
    if (buildingId) {
      Object.assign(additionalFilterParameters, {
        buildingId: `"${String(buildingId)}"`,
      });
    }
    if (size) {
      Object.assign(additionalFilterParameters, {
        size: `"${String(size)}"`,
      });
    }
    if (flatId) {
      Object.assign(additionalFilterParameters, {
        flatId,
      });
    }
    return {
      sortParams,
      page: Number(page),
      searchQuery: searchQuery ? String(searchQuery) : "",
      additionalFilterParameters: additionalFilterParameters,
    };
  }
};

export const getMainTableController: RequestHandler = async (req, res) => {
  const params = getTableDataQueryParams(req);
  await getAllFromAllTables(
    (value) => {
      res.send(JSON.stringify(value));
    },
    params?.page,
    params?.sortParams,
    params?.searchQuery,
    params?.additionalFilterParameters
  );
};
