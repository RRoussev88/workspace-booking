import { createContext } from 'react';
import { AuthContextType } from 'models/types';

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: () => false,
  onLogin: () => {},
  logout: () => {},
  coworker: null,
});
