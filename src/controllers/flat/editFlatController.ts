import { Handler, Request } from "express";
import isEmpty from "lodash/isEmpty";
import { editFlat } from "../../db/operations/flat";
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
  const { flatId, ...rest } = request.query;
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
    const { flatId, ...updatedAtributes } = mappedParams;
    await editFlat(flatId, updatedAtributes, () => {
      res.status(200);
    });
  } else {
    res.status(400);
  }
};
