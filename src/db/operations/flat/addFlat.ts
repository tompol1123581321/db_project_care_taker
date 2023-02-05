import { insertSingleRow } from "../generic/insert";

export const addFlat = async (
  ownerId: number,
  flatTypeId: number,
  buildingId: number,
  cb: (arg: any) => void
) => {
  const flatsQuery = `${ownerId}, ${flatTypeId}, ${buildingId}`;
  await insertSingleRow(
    "flats",
    "ownerId, flatTypeId, buildingId",
    flatsQuery,
    cb
  );
};
