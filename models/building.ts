export type BuildingAtributes = {
  buildingAddress: string;
  buildDate: Date;
  representativeId: number;
};

export type Building = {
  buildingId: number;
} & BuildingAtributes;

export type AgregatedBuilding = {
  name: string;
  email: string;
} & Building;
