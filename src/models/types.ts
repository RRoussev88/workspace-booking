export type NavItem = { name: string; url: string; isAuthRequired: boolean };

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

export type Organization = {
  id: string;
  name: string;
  description: string;
  contact: string[]; // Coworker ids
  participants: string[]; // Coworker ids
  offices: string[]; // Office ids
  image?: string;
};

export type Coworker = { id: string; email: string; name?: string; avatar?: string };

export enum OfficeType {
  SIMPLE = 'simple',
  NAMED = 'named',
  BLUEPRINT = 'blueprint',
}

export enum OrgType {
  OPEN = 'open', // Coworking space
  CLOSED = 'closed', // Company
}

export type AuthToken = {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: 'Bearer';
};

export type CoworkerPayload = Partial<{
  coworkerId: string;
  coworkerName: string;
  authTime: number;
  issueTime: number;
  expTime: number;
  organisations: string[];
}>;

export type AuthContextType = {
  token: AuthToken | null;
  isLoggedIn: () => boolean;
  onLogin: (onLoginToken: AuthToken | null, onLoginCoworker: CoworkerPayload | null) => void;
  logout: () => void;
  coworker: CoworkerPayload | null;
};

export type APIError = { statusCoe: number; message: string };
