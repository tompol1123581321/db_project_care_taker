import { Handler, Request, json } from "express";
import isEmpty from "lodash/isEmpty";
import { addOwner } from "../../db/operations/owner";
import { OwnerAtributes } from "../../models/ownerModels";

const mapNewAtributes = (request: Request) => {
  const newAtributes = JSON.stringify(request.body);
  const parsed = JSON.parse(newAtributes) as Record<keyof OwnerAtributes, any>;
  if (!isEmpty(parsed)) {
    return parsed;
  }
};

export const addOwnerController: Handler = async (req, res) => {
  const newAtributes = mapNewAtributes(req);
  if (newAtributes) {
    const { ...rest } = newAtributes;
    await addOwner(rest, () => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
