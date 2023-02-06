import { Handler, Request } from "express";
import isEmpty from "lodash/isEmpty";
import { editOwner } from "../../db/operations/owner";
import { EditedOwnerAtributes, OwnerAtributes } from "../../models/ownerModels";

const mapUpdatedAtributes = (request: Request) => {
  const updatedAtributes = JSON.parse(JSON.stringify(request.body)) as Record<
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
    const { ownerId, birthDate, email, name, ownerAddress } = updatedAtributes;
    const changedParams = {} as Record<"ownerId" | keyof OwnerAtributes, any>;
    if (ownerAddress !== undefined) {
      Object.assign(changedParams, {
        ownerAddress: `"${String(ownerAddress)}"`,
      });
    }
    if (birthDate !== undefined) {
      Object.assign(changedParams, {
        birthDate: new Date(birthDate).toISOString().split("T")[0],
      });
    }
    if (email !== undefined) {
      Object.assign(changedParams, {
        email: `"${String(email)}"`,
      });
    }
    if (name !== undefined) {
      Object.assign(changedParams, {
        name: `"${String(name)}"`,
      });
    }

    await editOwner(ownerId, changedParams, () => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
