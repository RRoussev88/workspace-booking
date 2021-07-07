export type Organization = {
  id: string;
  name: string;
  type: OrgType;
  description: string;
  contact: string[]; // Coworker ids
  participants: string[]; // Coworker ids
  offices: string[]; // Office ids
  image?: string;
};

export enum OrgType {
  OPEN = 'open', // Coworking space
  CLOSED = 'closed', // Company
}
