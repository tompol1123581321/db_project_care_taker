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

export type AdditionalFilterParameters = {
  rented?: string;
  buildingId?: number;
  size?: string;
};
