import { Col, Row, Select, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building,
  EditOrAddFlatItem,
  FlatType,
  Owner,
} from "../../../../../models";
import { getAllOwners } from "../../../api";

type Props = {
  isNew: boolean;
  currentFlatItem: EditOrAddFlatItem;
  setCurrentFlatItem: (falt: EditOrAddFlatItem) => void;
  flatTypes: Array<FlatType>;
  buildings: Array<Building>;
};
export const FlatForm: React.FC<Props> = ({
  isNew,
  currentFlatItem,
  flatTypes,
  buildings,
  setCurrentFlatItem,
}) => {
  const [owners, setOwners] = useState<Array<Owner>>([]);
  const getOwnersOptions = useCallback(async () => {
    const response = await getAllOwners();
    setOwners(response.data);
  }, []);

  const flatTypeOptions = useMemo(() => {
    return flatTypes.map((f) => ({
      value: f.flatTypeId,
      label: `${f.size}-${f.rented === "true" ? "rented" : "not rented"}`,
    }));
  }, [flatTypes]);

  const buildingOptions = useMemo(() => {
    return buildings.map((b) => ({
      value: b.buildingId,
      label: b.buildingAddress,
    }));
  }, [buildings]);

  useEffect(() => {
    getOwnersOptions();
  }, [getOwnersOptions]);

  const onChangeFlatType = useCallback(
    (flatTypeId: number) => {
      setCurrentFlatItem({ ...currentFlatItem, flatTypeId });
    },
    [currentFlatItem]
  );
  const onChangeOwner = useCallback(
    (ownerId: number) => {
      setCurrentFlatItem({ ...currentFlatItem, ownerId });
    },
    [currentFlatItem]
  );

  const onBuildingChange = useCallback((buildingId: number) => {
    setCurrentFlatItem({ ...currentFlatItem, buildingId });
  }, []);
  return (
    <>
      {isNew && (
        <Row align={"middle"}>
          <Col span={5}>
            <Typography.Text strong>Building</Typography.Text>
          </Col>
          <Col span={4}>
            <Select
              onChange={onBuildingChange}
              value={currentFlatItem?.buildingId}
              size="large"
              style={{ width: "15rem", marginBottom: "1rem " }}
              options={buildingOptions}
            />
          </Col>
        </Row>
      )}
      <Row align={"middle"}>
        <Col span={5}>
          <Typography.Text strong>Flat type</Typography.Text>
        </Col>
        <Col span={4}>
          <Select
            value={currentFlatItem?.flatTypeId}
            onChange={onChangeFlatType}
            size="large"
            style={{ width: "15rem", marginBottom: "1rem " }}
            options={flatTypeOptions}
          />
        </Col>
      </Row>
      <Row align={"middle"}>
        <Col span={5}>
          <Typography.Text strong>Owner</Typography.Text>
        </Col>
        <Col span={4}>
          <Select
            onChange={onChangeOwner}
            value={currentFlatItem?.ownerId}
            options={owners.map((owner) => ({
              value: owner.ownerId,
              label: owner.name,
            }))}
            size="large"
            style={{ width: "15rem", marginBottom: "1rem " }}
          />
        </Col>
      </Row>
    </>
  );
};
