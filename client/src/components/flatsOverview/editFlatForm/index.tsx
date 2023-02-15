import { Drawer } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  Building,
  CompleteFlatItem,
  EditOrAddFlatItem,
  FlatType,
} from "../../../../../models";
import { FlatForm } from "./Form";
import { OwnerInfo } from "./OwnerInfo";
import { SubmitButtons } from "./SubmitButtons";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
  initData: null | CompleteFlatItem;
  flatTypes: Array<FlatType>;
  buildings: Array<Building>;
};
export const EditCompleteFlatItemForm: React.FC<Props> = ({
  isOpen,
  onClose,
  initData,
  flatTypes,
  buildings,
}) => {
  const [currentFlatItem, setCurrentFlatItem] = useState<EditOrAddFlatItem>(
    initData != null ? initData : {}
  );

  const isNew = useMemo(() => {
    return !initData;
  }, [initData]);

  useEffect(() => {
    if (initData) {
      setCurrentFlatItem({
        buildingId: initData.buildingId,
        flatTypeId: initData.flatTypeId,
        ownerId: initData.ownerId,
        flatId: initData.flatId,
      });
    } else {
      setCurrentFlatItem({});
    }
  }, [initData]);

  return (
    <Drawer
      size="large"
      title={isNew ? "Add new flat" : "Edit flat"}
      placement="right"
      onClose={() => {
        onClose();
        setCurrentFlatItem({});
      }}
      open={isOpen}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatForm
        buildings={buildings}
        currentFlatItem={currentFlatItem}
        flatTypes={flatTypes}
        isNew={isNew}
        setCurrentFlatItem={setCurrentFlatItem}
      />
      <OwnerInfo currentFlatItem={currentFlatItem} />
      <SubmitButtons
        currentFlatItem={currentFlatItem}
        initData={initData}
        isNew={isNew}
        onClose={onClose}
        setCurrentFlatItem={setCurrentFlatItem}
      />
    </Drawer>
  );
};
