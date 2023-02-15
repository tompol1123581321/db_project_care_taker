import React, { useCallback, useMemo } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CompleteFlatItem,
  SortParameters,
  TableParams,
} from "../../../../../models";
import { SortLabel } from "../sorting";
import { ActionsItem } from "../actions";
import { deleteFlat } from "../../../api";

type Props = {
  currentFilterParams: TableParams;
  onFilterParamsChange: (newParams: TableParams) => void;
  tableData: Array<CompleteFlatItem>;
  onEditFlatItem: (data: CompleteFlatItem) => void;
};

export const FlatsOverviewTable: React.FC<Props> = ({
  currentFilterParams,
  onFilterParamsChange,
  tableData,
  onEditFlatItem,
}) => {
  const updateSortParams = useCallback(
    (newSortParams: SortParameters) => {
      onFilterParamsChange({
        ...currentFilterParams,
        sortParams: newSortParams,
        page: 1,
      });
    },
    [currentFilterParams, onFilterParamsChange]
  );

  const columns = useMemo(() => {
    const cols: ColumnsType<CompleteFlatItem> = [
      ...[
        {
          title: "Id",
          dataIndex: "flatId",
          key: "flatId",
        },
        {
          title: "Owner name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Owner email",
          key: "email",
          dataIndex: "email",
        },
        {
          title: "Address",
          dataIndex: "buildingAddress",
          key: "buildingAddress",
        },
        {
          title: "Rented",
          key: "rented",
          dataIndex: "rented",
          render: (value: string) =>
            value === "true" ? "rented" : "not rented",
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
        },
        {
          title: "Build date",
          dataIndex: "buildDate",
          key: "buildDate",
        },
      ].map((item) => ({
        ...item,
        title: (
          <SortLabel
            label={item.title}
            name={item.key as keyof CompleteFlatItem}
            sortParams={currentFilterParams.sortParams}
            updateSortParams={updateSortParams}
          />
        ),
      })),
      {
        title: "Actions",
        render: (_, item: CompleteFlatItem) => {
          const onEdit = async () => {
            await onEditFlatItem(item);
            onFilterParamsChange({ ...currentFilterParams });
          };
          const onDelete = async () => {
            await deleteFlat(item.flatId);
            onFilterParamsChange({ ...currentFilterParams });
          };
          return (
            <ActionsItem onDeleteItem={onDelete} onOpenEditForm={onEdit} />
          );
        },
        key: "actions",
      },
    ];
    return cols;
  }, [currentFilterParams.sortParams, updateSortParams]);

  return (
    <Table
      bordered
      style={{ marginBottom: "0.5rem" }}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};
