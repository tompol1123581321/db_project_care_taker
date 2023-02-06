import { Handler, Request } from "express";
import isEmpty from "lodash/isEmpty";
import { editFlat } from "../../db/operations/flat";
import { deleteUnreferencedOwners } from "../../db/operations/owner";
import {
  FlatAtributes,
  UpdatedFlatItemAtributes,
} from "../../models/flatModels";

const mapEditFlatParams = (
  request: Request
):
  | undefined
  | (Record<keyof FlatAtributes, FlatAtributes[keyof FlatAtributes]> & {
      flatId: number;
    }) => {
  const { flatId, ...rest } = JSON.parse(JSON.stringify(request.body));
  if (flatId && !isEmpty(rest)) {
    return { flatId, ...rest } as unknown as Record<
      keyof UpdatedFlatItemAtributes,
      UpdatedFlatItemAtributes[keyof UpdatedFlatItemAtributes]
    > & { flatId: number };
  }
};
export const editFlatController: Handler = async (req, res) => {
  const mappedParams = mapEditFlatParams(req);
  if (mappedParams) {
    const { flatId, buildingId, flatTypeId, ownerId } = mappedParams;
    const changedParams = {} as Record<
      keyof FlatAtributes,
      FlatAtributes[keyof FlatAtributes]
    >;
    if (buildingId !== undefined) {
      Object.assign(changedParams, {
        buildingId,
      });
    }
    if (flatTypeId !== undefined) {
      Object.assign(changedParams, {
        flatTypeId,
      });
    }
    if (ownerId !== undefined) {
      Object.assign(changedParams, {
        ownerId,
      });
    }

    await editFlat(flatId, changedParams, async () => {
      await deleteUnreferencedOwners();
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
};
