import { Handler, Request } from "express";
import { addFlat } from "../../db/operations/flat";

const addFlatParamsMapper = (request: Request) => {
  const { buildingId, flatTypeId, ownerId } = request.query;
  if (buildingId && flatTypeId && ownerId) {
    return { buildingId, flatTypeId, ownerId };
  }
};

export const addFlatController: Handler = async (req, res) => {
  const params = addFlatParamsMapper(req);
  if (params) {
    await addFlat(
      Number(params.ownerId),
      Number(params.flatTypeId),
      Number(params.buildingId),
      () => {
        res.status(200);
      }
    );
  } else {
    res.status(400);
  }
};
