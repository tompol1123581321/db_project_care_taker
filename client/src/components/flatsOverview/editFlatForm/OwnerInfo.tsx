import { Col, Row, Tag, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EditOrAddFlatItem, Owner } from "../../../../../models";
import { getAllOwners } from "../../../api";

type Props = { currentFlatItem: EditOrAddFlatItem };
export const OwnerInfo: React.FC<Props> = ({ currentFlatItem }) => {
  const [owners, setOwners] = useState<Owner[]>([]);

  const ownerDetailData: Owner | undefined = useMemo(() => {
    if (currentFlatItem.ownerId) {
      const pickedOwner = owners.find(
        (o) => o.ownerId === currentFlatItem.ownerId
      );
      return pickedOwner;
    }
  }, [currentFlatItem, owners]);

  const getOwnersOptions = useCallback(async () => {
    const response = await getAllOwners();
    setOwners(response.data);
  }, []);

  useEffect(() => {
    getOwnersOptions();
  }, [getOwnersOptions]);

  if (!ownerDetailData) {
    return null;
  }

  return (
    <>
      <Row>
        <Col span={5}>
          <Typography.Title level={5}>Owner info</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem " }}>
        <Col span={5}>
          <Typography.Text strong>Id</Typography.Text>
        </Col>
        <Col span={4}>
          <Tag color={"geekblue"}>{ownerDetailData?.ownerId}</Tag>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem " }}>
        <Col span={5}>
          <Typography.Text strong>Birth date</Typography.Text>
        </Col>
        <Col span={4}>
          <Tag color={"geekblue"}>{`${ownerDetailData?.birthDate}`}</Tag>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem " }}>
        <Col span={5}>
          <Typography.Text strong>Email</Typography.Text>
        </Col>
        <Col span={4}>
          <Tag color={"geekblue"}>{ownerDetailData?.email}</Tag>
        </Col>
      </Row>
    </>
  );
};
