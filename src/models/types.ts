export type NavItem = { name: string; url: string };

export type Office = {
  id: string;
  companyId: string;
  type: OfficeType;
  name: string;
  address: string;
  contact: Employee;
  description: string;
  image: string;
  capacity: number;
  occupied: number;
  meetingRooms: number;
  relaxZones: number;
  printers: number;
};

export type Employee = { id: string; name: string; email: string; avatar: string };

export enum OfficeType {
  SIMPLE = 'simple',
  NAMED = 'named',
  BLUEPRINT = 'blueprint',
}
