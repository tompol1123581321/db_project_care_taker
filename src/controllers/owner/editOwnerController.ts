import { Handler, Request } from "express";
import isEmpty from "lodash/isEmpty";
import { editOwner } from "../../db/operations/owner";
import { EditedOwnerAtributes } from "../../models/ownerModels";

const mapUpdatedAtributes = (request: Request) => {
  const updatedAtributes = request.query as Record<
    keyof EditedOwnerAtributes,
    any
  >;
  const { ownerId, ...rest } = updatedAtributes;
  if (ownerId && !isEmpty(rest)) {
    return updatedAtributes;
  }
};

export const editOwnerController: Handler = async (req, res) => {
  const updatedAtributes = mapUpdatedAtributes(req);
  if (updatedAtributes) {
    const { ownerId, ...rest } = updatedAtributes;
    await editOwner(ownerId, rest, () => {
      res.status(200);
    });
  } else {
    res.status(400);
  }
};
