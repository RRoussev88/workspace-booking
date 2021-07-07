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
