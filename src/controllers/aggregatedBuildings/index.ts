import { Handler } from "express";
import { getBuildingInfoWithRepresentative } from "../../db/operations/aggregatedBuildings";

export const aggregatedBuildingsController: Handler = async (_, res) => {
  await getBuildingInfoWithRepresentative((value) => {
    res.send(JSON.stringify(value));
  });
};
