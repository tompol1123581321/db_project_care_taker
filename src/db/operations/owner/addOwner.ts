import { OwnerAtributes } from "../../../../models/owner";
import { insertSingleRow } from "../generic/insert";
import { format } from "mysql";

export const addOwner = async (
  newOwnerParams: OwnerAtributes,
  cb: (val: any) => void
) => {
  const genericSql =
    "INSERT INTO owners (ownerAddress, name, birthDate, email) VALUES (?,?,?,?)";
  const sql = format(genericSql, [
    newOwnerParams.ownerAddress,
    newOwnerParams.name,
    new Date(newOwnerParams.birthDate).toISOString().split("T")[0],
    newOwnerParams.email,
  ]);

  await insertSingleRow(sql, cb);
};
