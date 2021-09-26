import { createContext } from 'react';
import { AuthContextType } from './models';

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
  coworker: null,
});
