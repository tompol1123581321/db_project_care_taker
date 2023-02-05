import { FlatAtributes } from "../../../models/flatModels";
import { updateWithCondition } from "../generic/update";
import { deleteUnreferencedOwners } from "../owner/deleteUnreferencedOwners";

export const editFlat = async (
  flatId: number,
  updatedAtributes: Record<
    keyof FlatAtributes,
    FlatAtributes[keyof FlatAtributes]
  >,
  cb: (value: any) => void
) => {
  const flatChangedColumns = Object.keys(updatedAtributes)
    .filter(
      (key) => key === "ownerId" || key === "flatTypeId" || key === "buildingId"
    )
    .map((key) => ({
      column: key,
      value: updatedAtributes[key as keyof typeof updatedAtributes],
    }));

  if (!!flatChangedColumns.length && flatId) {
    const condition = `flatId = ${flatId}`;
    await updateWithCondition(
      "flats",
      flatChangedColumns,
      condition,
      async (value) => {
        await deleteUnreferencedOwners();
        cb(value);
      }
    );
  }
};
