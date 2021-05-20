export type NavItem = { name: string; url: string };

export type Office = {
  id: string;
  name: string;
  address: string;
  contact: Employee;
  description: string;
  image: string;
  capacity: number;
  occupied: number;
  meetingRooms: number;
  relaxZone: boolean;
  printer: boolean;
};

export type Employee = { id: string; name: string; email: string; avatar: string };
