import React from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FlatType } from "../../../../models";
import { Typography } from "antd";

const columns: ColumnsType<FlatType> = [
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    render: (text) => text,
  },
  {
    title: "Rented",
    dataIndex: "rented",
    key: "rented",
  },
];

export const FlatTypesTable: React.FC<{ flatTypes: Array<FlatType> }> = ({
  flatTypes,
}) => (
  <Table
    caption={<Typography.Title level={5}>Flat types</Typography.Title>}
    pagination={{ pageSize: 4 }}
    columns={columns}
    dataSource={flatTypes}
  />
);
