import { format } from "mysql";
import { insertSingleRow } from "../generic/insert";

export const addFlat = async (
  ownerId: number,
  flatTypeId: number,
  buildingId: number,
  cb: (arg: any) => void
) => {
  const flatsQuery = `${ownerId}, ${flatTypeId}, ${buildingId}`;
  const genericSql =
    "INSERT INTO flats (ownerId, flatTypeId, buildingId) VALUES (?,?,?)";
  const sql = format(genericSql, [ownerId, flatTypeId, buildingId]);
  await insertSingleRow(sql, cb);
};
