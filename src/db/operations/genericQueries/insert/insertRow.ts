import { getDbClient } from "../../../connection";

export const insertSingleRow = async (
  values: string,
  tableDefinition: {
    name: "buildings" | "flats" | "flatTypes" | "owners";
    definition: string;
  },
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  try {
    const sql = `INSERT INTO ${tableDefinition.name} (${tableDefinition.definition}) VALUES ${values}`;

    const client = getDbClient();
    if (!client) return;

    await client.query(sql, (error, res) => {
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
