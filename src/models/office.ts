export type Office = {
  id: string;
  organizationId: string;
  type: OfficeType;
  name: string;
  address: string;
  contact: string[];
  description: string;
  image?: string;
  capacity: number;
  occupied: number;
  // meetingRooms: number;
  // relaxZones: number;
  // printers: number;
};

export enum OfficeType {
  SIMPLE = 'simple',
  NAMED = 'named',
  BLUEPRINT = 'blueprint',
}
