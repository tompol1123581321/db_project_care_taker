import { Handler } from "express";
import { deleteFlat } from "../../db/operations/flat";

export const deleteFlatController: Handler = async (req, res) => {
  const { id } = req.query;
  if (id) {
    await deleteFlat(Number(id), () => {
      res.status(200);
    });
  } else {
    res.status(400);
  }
};
