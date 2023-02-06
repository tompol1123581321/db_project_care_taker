import { Handler } from "express";
import { deleteFlat } from "../../db/operations/flat";
import { deleteUnreferencedOwners } from "../../db/operations/owner";

export const deleteFlatController: Handler = async (req, res) => {
  const { id } = JSON.parse(JSON.stringify(req.body));
  if (id) {
    await deleteFlat(Number(id), async () => {
      await deleteUnreferencedOwners();
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
