import React, { ChangeEvent, useCallback, useMemo } from "react";
import {
  AdditionalFilterParameters,
  Building,
  defaultFilterParams,
  FlatType,
  TableParams,
} from "../../../../models";
import { Button, Card, Input, Select, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type Props = {
  currentFilterParams: TableParams;
  onFilterParamsChange: (newParams: TableParams) => void;
  buildingOptions: Array<Building>;
  flatTypeOptions: Array<FlatType>;
  onOpenAddNewForm: () => void;
};

export const FilterForm: React.FC<Props> = ({
  currentFilterParams = defaultFilterParams,
  onFilterParamsChange,
  buildingOptions,
  flatTypeOptions,
  onOpenAddNewForm,
}) => {
  const buildingSelectOptions = useMemo(() => {
    return [
      { label: "Filter by a building", value: 0 },
      ...buildingOptions.map((building) => ({
        value: building.buildingId,
        label: building.buildingAddress,
      })),
    ];
  }, [buildingOptions]);

  const flatTypeSelectOptions = useMemo(() => {
    return [
      { value: 0, label: "Filter by a flat type" },
      ...flatTypeOptions.map((flatType) => {
        return {
          value: flatType.flatTypeId,
          label: `${flatType.size}-${
            flatType.rented === "true" ? "rented" : "not rented"
          }`,
        };
      }),
    ];
  }, [flatTypeOptions]);

  const onSearchQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onFilterParamsChange({
        ...currentFilterParams,
        searchQuery: e.target.value,
        page: 1,
      });
    },
    [currentFilterParams, onFilterParamsChange]
  );
  const getOnAdditionalFilerParametersChange = useCallback(
    (name: keyof AdditionalFilterParameters) => {
      return (value: number) => {
        onFilterParamsChange({
          ...currentFilterParams,
          page: 1,
          additionalFilterParameters: {
            ...currentFilterParams.additionalFilterParameters,
            [name]: value,
          },
        });
      };
    },
    [currentFilterParams, onFilterParamsChange]
  );

  return (
    <Card size="default">
      <Typography.Title level={3}>Flats Overview</Typography.Title>

      <Input
        size="large"
        style={{
          maxWidth: "25rem",
          marginRight: "0.5rem",
        }}
        addonBefore="Search term"
        name={"searchQuery"}
        value={currentFilterParams.searchQuery}
        onChange={onSearchQueryChange}
      />

      <Select
        style={{
          minWidth: "16rem",
          marginRight: "0.5rem",
        }}
        size="large"
        options={buildingSelectOptions}
        value={currentFilterParams.additionalFilterParameters.buildingId}
        onChange={getOnAdditionalFilerParametersChange("buildingId")}
      />

      <Select
        style={{
          minWidth: "12rem",
          marginRight: "0.5rem",
        }}
        size="large"
        options={flatTypeSelectOptions}
        value={currentFilterParams.additionalFilterParameters.flatTypeId}
        onChange={getOnAdditionalFilerParametersChange("flatTypeId")}
      />

      <Button
        style={{
          marginRight: "0.5rem",
        }}
        size="large"
        type="primary"
        danger
        onClick={() => onFilterParamsChange(defaultFilterParams)}
      >
        Reset
      </Button>
      <Button size="large" type="primary" onClick={onOpenAddNewForm}>
        <PlusOutlined />
      </Button>
    </Card>
  );
};
