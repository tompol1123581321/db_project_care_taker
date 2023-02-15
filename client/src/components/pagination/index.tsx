import { Pagination } from "antd";
import { TableParams } from "../../../../models";

type Props = {
  currentFilterParams: TableParams;
  onFilterParamsChange: (newParams: TableParams) => void;
  totalCount: number | null;
};

export const PaginationForm: React.FC<Props> = ({
  currentFilterParams,
  onFilterParamsChange,
  totalCount,
}) => {
  if (totalCount && currentFilterParams.page)
    return (
      <Pagination
        style={{ marginBottom: "2rem" }}
        pageSize={5}
        current={currentFilterParams.page}
        onChange={(page) => {
          onFilterParamsChange({ ...currentFilterParams, page });
        }}
        total={totalCount}
      />
    );
  return null;
};
