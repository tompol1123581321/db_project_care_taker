import { Handler } from "express";
import { deleteUnreferencedOwners } from "../../db/operations/owner";

export const deleteOwnerController: Handler = async (req, res) => {
  const { id } = req.query;
  if (id) {
    await deleteUnreferencedOwners(String(id), () => {
      res.status(200);
    });
  } else {
    res.status(400);
  }
};
