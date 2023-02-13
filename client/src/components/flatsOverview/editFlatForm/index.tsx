import { Drawer } from "antd";
import { CompleteFlatItem } from "../../../../../models";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
  initData: null | CompleteFlatItem;
};
export const EditCompleteFlatItemForm: React.FC<Props> = ({
  isOpen,
  onClose,
  initData,
}) => {
  return (
    <Drawer
      size="large"
      title={initData === null ? "Add new flat" : "Edit flat"}
      placement="right"
      onClose={onClose}
      open={isOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
