import { AdditionalFilterParameters } from "./types";

export const getAdditionalFilterParametersQuery = (
  additionalFilterParams?: AdditionalFilterParameters
): string | undefined => {
  if (!additionalFilterParams) return " ";
  const additionalFilterParamsAsArr = Object.keys(additionalFilterParams);
  console.log(additionalFilterParams);

  if (!!additionalFilterParamsAsArr.length) {
    const query = additionalFilterParamsAsArr
      .map((key) => {
        if (
          additionalFilterParams[key as keyof AdditionalFilterParameters] !==
          undefined
        ) {
          return `${key} = ${
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
