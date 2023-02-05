import { Handler } from "express";
import { getAllFromTable } from "../../db/operations/generic/select";

export const getGetAllFromTableController = (
  tableName: "buildings" | "flats" | "flatTypes" | "owners"
): Handler => {
  return async (_, res) => {
    await getAllFromTable(tableName, (value) => {
      res.send(JSON.stringify(value));
    });
  };
};
