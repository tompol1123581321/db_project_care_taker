import { CREATE_TABLE_ARGS, POPULATE_TABLES_ARGS } from "./constants";
import { createTable } from "./createTable";
import { populateTable } from "./populateTable";

export const createAndPopulateTables = async () => {
  CREATE_TABLE_ARGS.forEach(async (tblArgs) => {
    await createTable(tblArgs.name, tblArgs.definition, tblArgs.hasForeignKey);
  });

  (
    ["owners", "flatTypes", "buildings", "flats"] as Array<
      "buildings" | "flats" | "flatTypes" | "owners"
    >
  ).forEach(async (key) => {
    await populateTable(
      POPULATE_TABLES_ARGS[key].sql,
      POPULATE_TABLES_ARGS[key].data
    );
  });
};
