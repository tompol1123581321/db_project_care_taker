export type Flat = {
  flatId: number;
} & FlatAtributes;

export type FlatAtributes = {
  ownerId: number;
  flatTypeId: number;
  buildingId: number;
};

export type EditOrAddFlatItem = {
  buildingId?: number;
  flatId?: number;
  ownerId?: number;
  flatTypeId?: number;
};
