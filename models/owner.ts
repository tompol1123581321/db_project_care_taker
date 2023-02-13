export type OwnerAtributes = {
  ownerAddress: string;
  name: string;
  birthDate: Date;
  email: string;
};

export type Owner = {
  ownerId: number;
} & OwnerAtributes;
