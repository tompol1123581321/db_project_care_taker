export type Flat = {
  flatId: number;
} & FlatAtributes;

export type FlatAtributes = {
  ownerId: number;
  flatTypeId: number;
  buildingId: number;
};
