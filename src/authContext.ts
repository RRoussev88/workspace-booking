import { createContext } from 'react';
import { AuthContextType } from 'models/context';

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: () => false,
  onLogin: () => {},
  logout: () => {},
  coworker: null,
});
