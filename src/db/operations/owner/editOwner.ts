import { OwnerAtributes } from "../../../models/ownerModels";
import { updateWithCondition } from "../generic/update";

export const editOwner = async (
  ownerId: number,
  updatedAtributes: OwnerAtributes,
  cb: (value: Array<Record<string, unknown>>) => void
) => {
  const ownerChangedColumns = Object.keys(updatedAtributes)
    .filter(
      (key) =>
        key === "ownerAddress" ||
        key === "name" ||
        key === "birthDate" ||
        key === "email"
    )
    .map((key) => ({
      column: key,
      value: updatedAtributes[key as keyof typeof updatedAtributes],
    }));

  if (!!ownerChangedColumns.length && ownerId) {
    const condition = `ownerId = ${ownerId}`;
    await updateWithCondition("owners", ownerChangedColumns, condition, cb);
  }
};
