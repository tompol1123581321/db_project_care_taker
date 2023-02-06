import { OwnerAtributes } from "../../../models/ownerModels";
import { insertSingleRow } from "../generic/insert";
import { format } from "mysql";

export const addOwner = async (
  newOwnerParams: OwnerAtributes,
  cb: (val: any) => void
) => {
  console.log(newOwnerParams);
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
