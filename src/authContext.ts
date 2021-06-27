import { createContext } from 'react';
import { AuthContextType, AuthToken } from 'models/types';

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: () => false,
  onLogin: (token: AuthToken | null) => {},
  logout: () => {},
  coworkerId: null,
});
