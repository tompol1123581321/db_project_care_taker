import { Handler, Request } from "express";
import isEmpty from "lodash/isEmpty";
import { addOwner } from "../../db/operations/owner";
import { OwnerAtributes } from "../../models/ownerModels";

const mapNewAtributes = (request: Request) => {
  const newAtributes = request.query as Record<keyof OwnerAtributes, any>;
  const { ...rest } = newAtributes;
  if (!isEmpty(rest)) {
    return newAtributes;
  }
};

export const addOwnerController: Handler = async (req, res) => {
  const newAtributes = mapNewAtributes(req);
  if (newAtributes) {
    const { ...rest } = newAtributes;
    await addOwner(rest, () => {
      res.status(200);
    });
  } else {
    res.status(400);
  }
};
