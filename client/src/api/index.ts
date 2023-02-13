import axios, { AxiosResponse } from "axios";
import {
  Building,
  CompleteFlatItem,
  FlatType,
  TableParams,
} from "../../../models";

const prefix = "http://localhost:3001/api/";

export const getAllBuildings = async (): Promise<
  AxiosResponse<Array<Building>>
> => {
  const url = `${prefix}buildings`;
  return await axios.get(url);
};

export const getAllFlatTypes = async (): Promise<
  AxiosResponse<Array<FlatType>>
> => {
  const url = `${prefix}flatTypes`;
  return await axios.get(url);
};

export const getAggregatedData = async (
  filterParams: TableParams
): Promise<
  AxiosResponse<{ content: Array<CompleteFlatItem>; totalCount: number }>
> => {
  const url = `${prefix}aggregatedTableData`;
  const { additionalFilterParameters, sortParams, ...rest } = filterParams;
  const transformedAdditionalParams = {};
  if (additionalFilterParameters.flatTypeId !== 0) {
    Object.assign(transformedAdditionalParams, {
      flatTypeId: additionalFilterParameters.flatTypeId,
    });
  }
  if (additionalFilterParameters.buildingId !== 0) {
    Object.assign(transformedAdditionalParams, {
      buildingId: additionalFilterParameters.buildingId,
    });
  }
  const params = { ...rest, ...sortParams, ...transformedAdditionalParams };
  return await axios.get(url, { params });
};
