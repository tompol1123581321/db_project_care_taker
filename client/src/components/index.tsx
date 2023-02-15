import { Col, Layout, Row, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCallback, useEffect, useState } from "react";
import {
  Building,
  CompleteFlatItem,
  defaultFilterParams,
  FlatType,
  TableParams,
} from "../../../models";
import { getAggregatedData, getAllBuildings, getAllFlatTypes } from "../api";
import { BuildingsTable, FlatTypesTable } from "./additionalTables";
import { EditCompleteFlatItemForm } from "./flatsOverview/editFlatForm";
import { FilterForm } from "./filterForm";
import { FlatsOverviewTable } from "./flatsOverview";
import { PaginationForm } from "./pagination";

export const CareTakerApp = () => {
  const [tableParams, setTableParams] = useState(defaultFilterParams);
  const [buildingOptions, setBuildingOptions] = useState<Array<Building>>([]);
  const [flatTypeOptions, setFlatTypeOptions] = useState<Array<FlatType>>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [tableContent, setTableContent] = useState<Array<CompleteFlatItem>>([]);
  const [formDrawerSettings, setFormDrawerSettings] = useState<{
    isOpen: boolean;
    formData: null | CompleteFlatItem;
  }>({
    isOpen: false,
    formData: null,
  });

  const getAllFlatTypesOptions = useCallback(async () => {
    const flatTypes = await getAllFlatTypes();
    setFlatTypeOptions(flatTypes.data);
  }, []);

  const getAllBuildingsOptions = useCallback(async () => {
    const buildings = await getAllBuildings();
    setBuildingOptions(buildings.data);
  }, []);

  const getAggregatedTableData = useCallback(
    async (tableParams: TableParams) => {
      const {
        data: { content, totalCount },
      } = await getAggregatedData(tableParams);
      setTotalCount(totalCount);
      setTableContent(content);
    },
    [tableParams]
  );

  useEffect(() => {
    getAllBuildingsOptions();
    getAllFlatTypesOptions();
  }, [getAllBuildingsOptions, getAllFlatTypesOptions]);

  useEffect(() => {
    getAggregatedTableData(tableParams);
  }, [tableParams]);

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title level={2}>CareTakerApp</Typography.Title>
      </Header>

      <Content
        style={{
          width: "80rem",
          maxWidth: "90rem",
          margin: "auto",
          marginTop: "2rem",
        }}
      >
        <Row>
          <Col span={17}>
            <BuildingsTable buildings={buildingOptions} />
          </Col>
          <Col span={6} offset={1}>
            <FlatTypesTable flatTypes={flatTypeOptions} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FilterForm
              buildingOptions={buildingOptions}
              flatTypeOptions={flatTypeOptions}
              currentFilterParams={tableParams}
              onFilterParamsChange={setTableParams}
              onOpenAddNewForm={() => {
                setFormDrawerSettings({ formData: null, isOpen: true });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FlatsOverviewTable
              onEditFlatItem={(formData) => {
                setFormDrawerSettings({ isOpen: true, formData });
              }}
              currentFilterParams={tableParams}
              tableData={tableContent}
              onFilterParamsChange={setTableParams}
            />
            <PaginationForm
              currentFilterParams={tableParams}
              onFilterParamsChange={setTableParams}
              totalCount={totalCount}
            />
          </Col>
        </Row>
        <EditCompleteFlatItemForm
          buildings={buildingOptions}
          flatTypes={flatTypeOptions}
          isOpen={formDrawerSettings.isOpen}
          initData={formDrawerSettings.formData}
          onClose={() => {
            setFormDrawerSettings({ formData: null, isOpen: false });
            setTableParams({ ...tableParams });
          }}
        />
      </Content>
    </Layout>
  );
};
