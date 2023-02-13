export type FlatTypeAtributes = {
  size: "1+1" | "2+1" | "3+1" | "4+1";
  rented: "true" | "false";
};

export type FlatType = {
  flatTypeId: number;
} & FlatTypeAtributes;
