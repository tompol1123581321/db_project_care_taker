import { Button, Col, Row } from "antd";
import { useCallback } from "react";
import { CompleteFlatItem, EditOrAddFlatItem } from "../../../../../models";
import { addFlat, editFlat } from "../../../api";

type Props = {
  currentFlatItem: EditOrAddFlatItem;
  setCurrentFlatItem: (item: EditOrAddFlatItem) => void;
  onClose: () => void;
  isNew: boolean;
  initData: CompleteFlatItem | null;
};
export const SubmitButtons: React.FC<Props> = ({
  currentFlatItem,
  setCurrentFlatItem,
  onClose,
  initData,
  isNew,
}) => {
  const onReset = useCallback(() => {
    if (initData) {
      setCurrentFlatItem(initData);
    } else {
      setCurrentFlatItem({});
    }
  }, [initData]);

  const onSubmit = useCallback(async () => {
    const { buildingId, flatId, flatTypeId, ownerId } = currentFlatItem;
    if (!isNew && !!flatId && buildingId && flatTypeId && ownerId) {
      await editFlat({ buildingId, flatId, flatTypeId, ownerId });
    } else if (buildingId && flatTypeId && ownerId) {
      await addFlat({ buildingId, flatTypeId, ownerId });
    }
    onClose();
    setCurrentFlatItem({});
  }, [currentFlatItem, onClose]);

  return (
    <Row style={{ marginTop: "4rem" }}>
      <Col span={1}>
        <Button
          onClick={onSubmit}
          style={{ backgroundColor: "green" }}
          type="primary"
        >
          Save
        </Button>
      </Col>
      <Col span={1} offset={10}>
        <Button onClick={onReset} danger type="primary">
          Reset
        </Button>
      </Col>
    </Row>
  );
};
