import React from "react";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Building } from "../../../../models";

// buildingAddress: string;
// buildDate: Date;
// representativeId: number;

const columns: ColumnsType<Building> = [
  {
    title: "Address",
    dataIndex: "buildingAddress",
    key: "buildingAddress",
    render: (text) => text,
  },
  {
    title: "Date of building",
    dataIndex: "buildDate",
    key: "buildDate",
  },
  {
    title: "Representative name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Representative email",
    dataIndex: "email",
    key: "email",
  },
];

export const BuildingsTable: React.FC<{ buildings: Array<Building> }> = ({
  buildings,
}) => (
  <Table
    bordered
    caption={<Typography.Title level={3}>Buildings</Typography.Title>}
    style={{ marginBottom: "2rem" }}
    columns={columns}
    dataSource={buildings}
    pagination={false}
  />
);
