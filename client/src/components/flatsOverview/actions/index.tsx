import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useCallback } from "react";
import { CompleteFlatItem } from "../../../../../models";

type Props = {
  onOpenEditForm: () => void;
  onDeleteItem: () => void;
};
export const ActionsItem: React.FC<Props> = ({
  onOpenEditForm,
  onDeleteItem,
}) => {
  return (
    <Row>
      <Col>
        <Button size="small" type="primary" onClick={onOpenEditForm}>
          <EditOutlined />
        </Button>
      </Col>
      <Col>
        <Button size="small" danger type="primary" onClick={onDeleteItem}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  );
};
