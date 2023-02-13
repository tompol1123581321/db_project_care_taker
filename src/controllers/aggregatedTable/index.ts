import { Request, RequestHandler } from "express";
import { SortParameters, TableParams } from "../../../models";
import {
  getAllFromAllTables,
  getCountFromAllTables,
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
    ownerId,
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
    if (ownerId) {
      Object.assign(additionalFilterParameters, {
        "flats.ownerId": Number(ownerId),
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
    async (value) => {
      await getCountFromAllTables(
        (c) => {
          const response = { content: value, totalCount: c[0].count };
          res.send(JSON.stringify(response));
        },
        params?.searchQuery,
        params?.additionalFilterParameters
      );
    },
    params?.page,
    params?.sortParams,
    params?.searchQuery,
    params?.additionalFilterParameters
  );
};
