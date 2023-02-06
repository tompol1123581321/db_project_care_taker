import { Handler } from "express";
import { deleteUnreferencedOwners } from "../../db/operations/owner";

export const deleteOwnerController: Handler = async (req, res) => {
  const { id } = JSON.parse(JSON.stringify(req.body));
  if (id) {
    await deleteUnreferencedOwners(String(id), () => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
