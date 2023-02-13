import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

type Props = {
  direction: "DESC" | "ASC";
};
export const SortIcon: React.FC<Props> = ({ direction }) => {
  return direction === "ASC" ? <CaretUpOutlined /> : <CaretDownOutlined />;
};
