import { Button } from "antd";
import { useCallback, useMemo } from "react";
import { CompleteFlatItem, SortParameters } from "../../../../../models";
import { SortIcon } from "./SortIcon";

type Props = {
  sortParams: SortParameters;
  name: keyof CompleteFlatItem;
  label: string;
  updateSortParams: (sortParams: SortParameters) => void;
};
export const SortLabel: React.FC<Props> = ({
  label,
  name,
  sortParams,
  updateSortParams,
}) => {
  const isActive = useMemo(() => {
    return name === sortParams.key;
  }, [name, sortParams.key]);

  const onClick = useCallback(() => {
    if (isActive) {
      updateSortParams({
        ...sortParams,
        direction: sortParams.direction === "ASC" ? "DESC" : "ASC",
      });
    } else {
      updateSortParams({ direction: "DESC", key: name });
    }
  }, [isActive, updateSortParams, name, sortParams]);

  return (
    <Button onClick={onClick}>
      {label} {isActive && <SortIcon direction={sortParams.direction} />}
    </Button>
  );
};
