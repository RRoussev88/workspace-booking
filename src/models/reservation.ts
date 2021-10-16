export interface Reservation {
  id: string;
  name: string;
  officeId: string;
  fromTime: number;
  toTime: number;
  user: string;
}

export interface NamedReservation extends Reservation {
  workspaceId: string;
}
