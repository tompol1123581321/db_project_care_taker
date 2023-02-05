import { genericDbOperation } from "../generic/utils/genericDbOperation";

export const deleteUnreferencedOwners = async (
  id?: string,
  cb?: () => void
) => {
  const query = `DELETE FROM owners WHERE owners.ownerId NOT IN (SELECT ownerId FROM flats) AND owners.ownerId NOT IN (SELECT representativeId from buildings) ${
    id ? `WHERE owners.ownerId = ${id}` : ""
  }`;

  await genericDbOperation(query, async () => {
    if (cb) {
      await cb();
    }
  });
};
