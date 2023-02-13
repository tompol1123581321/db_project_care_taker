export interface CompleteFlatItem {
  flatId: number;
  ownerId: number;
  flatTypeId: number;
  buildingId: number;
  buildingAddress: string;
  buildDate: Date;
  representativeId: number;
  size: string;
  rented: string;
  ownerAddress: string;
  name: string;
  birthDate: Date;
  email: string;
}

export type SortParameters = {
  key: keyof CompleteFlatItem;
  direction: "DESC" | "ASC";
};

export type TableParams = {
  page: number;
  sortParams: SortParameters;
  searchQuery: string;
  additionalFilterParameters: AdditionalFilterParameters;
};

export const defaultFilterParams: TableParams = {
  page: 1,
  searchQuery: "",
  sortParams: { direction: "DESC", key: "flatId" },
  additionalFilterParameters: { buildingId: 0, flatTypeId: 0 },
};

export type AdditionalFilterParameters = {
  flatTypeId?: number;
  buildingId?: number;
};
