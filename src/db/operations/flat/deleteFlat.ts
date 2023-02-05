import { deleteWithCondition } from "../generic/delete";
import { deleteUnreferencedOwners } from "../owner/deleteUnreferencedOwners";

export const deleteFlat = async (flatId: number, cb: (arg: any) => void) => {
  await deleteWithCondition(
    `flats.flatId = ${flatId}`,
    "flats",
    async (arg) => {
      await deleteUnreferencedOwners();
      cb(arg);
    }
  );
};
