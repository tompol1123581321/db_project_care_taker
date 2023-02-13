import { AdditionalFilterParameters } from "../../../../models";

const transformKey = (key: string) => {
  switch (key) {
    case "buildingId":
      return "buildings.buildingId";

    case "flatTypeId":
    default:
      return "flatTypes.flatTypeId";
  }
};

export const getAdditionalFilterParametersQuery = (
  additionalFilterParams?: AdditionalFilterParameters
): string | undefined => {
  if (!additionalFilterParams) return " ";
  const additionalFilterParamsAsArr = Object.keys(additionalFilterParams);
  if (!!additionalFilterParamsAsArr.length) {
    const query = additionalFilterParamsAsArr
      .map((key) => {
        if (
          additionalFilterParams[key as keyof AdditionalFilterParameters] !==
          undefined
        ) {
          return `${transformKey(key)} = ${
            additionalFilterParams[key as keyof AdditionalFilterParameters]
          }`;
        }
      })
      .filter((query) => !!query)
      .join(" AND ");
    return ` AND (${query}) `;
  }
  return " ";
};
