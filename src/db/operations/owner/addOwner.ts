import { OwnerAtributes } from "../../../models/ownerModels";
import { insertSingleRow } from "../generic/insert";
import { deleteUnreferencedOwners } from "./deleteUnreferencedOwners";

export const addOwner = async (
  newOwnerParams: OwnerAtributes,
  cb: (val: any) => void
) => {
  const ownersQuery = `${newOwnerParams.ownerAddress}, ${newOwnerParams.name}, ${newOwnerParams.birthDate}, ${newOwnerParams.email}`;

  await insertSingleRow(
    "owners",
    "ownerAddress, name, birthDate, email",
    ownersQuery,
    async (value) => {
      await deleteUnreferencedOwners();
      cb(value);
    }
  );
};
