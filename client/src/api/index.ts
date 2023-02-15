import axios, { AxiosResponse } from "axios";
import {
  Building,
  CompleteFlatItem,
  Flat,
  FlatAtributes,
  FlatType,
  Owner,
  OwnerAtributes,
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

export const deleteFlat = async (id: number) => {
  const url = `${prefix}deleteFlat`;
  await axios.post(url, { id });
};

export const addFlat = async (flatAtributes: FlatAtributes) => {
  const url = `${prefix}addFlat`;
  await axios.post(url, flatAtributes);
};

export const editFlat = async (flat: Flat) => {
  const url = `${prefix}editFlat`;
  await axios.post(url, flat);
};

export const getAllOwners = async () => {
  const url = `${prefix}owners`;
  return await axios.get(url);
};

export const editOwner = async (owner: Owner) => {
  const url = `${prefix}editOwner`;
  await axios.post(url, owner);
};

export const add = async (ownerAtributes: OwnerAtributes) => {
  const url = `${prefix}addOwner`;
  await axios.post(url, ownerAtributes);
};
