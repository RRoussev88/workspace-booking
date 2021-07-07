import logo from 'assets/logo.svg';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import { LocalStorageKey } from 'models/constants';
import { AuthToken, CoworkerPayload } from 'models/context';
import Login from 'pages/Login';
import Offices from 'pages/Offices';
import Organizations from 'pages/Organizations';
import OrganizationDetails from 'pages/OrganizationDetails';
import { FC, StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { AuthContext } from './authContext';

const App: FC = () => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [coworker, setCoworker] = useState<CoworkerPayload | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(LocalStorageKey.AUTH);
    const storedCoworker = localStorage.getItem(LocalStorageKey.COWORKER);
    if (storedToken) {
      try {
        setToken(JSON.parse(storedToken));
      } catch {
        // In case invalid JSON string is stored in localStorage
        setToken(null);
      }
    }

    if (storedCoworker) {
      try {
        setCoworker(JSON.parse(storedCoworker));
      } catch {
        // In case invalid JSON string is stored in localStorage
        setCoworker(null);
      }
    }
  }, []);

  const onLogin = (onLoginToken: AuthToken | null, onLoginCoworker: CoworkerPayload | null) => {
    setToken(onLoginToken);
    setCoworker(onLoginCoworker);
    localStorage.setItem(LocalStorageKey.AUTH, JSON.stringify(onLoginToken));
    localStorage.setItem(LocalStorageKey.COWORKER, JSON.stringify(onLoginCoworker));
  };

  const logout = () => {
    setToken(null);
    setCoworker(null);
    localStorage.removeItem(LocalStorageKey.AUTH);
    localStorage.removeItem(LocalStorageKey.COWORKER);
  };

  const isLoggedIn = () => !!token && new Date().valueOf() < token.ExpiresIn;

  return (
    <StrictMode>
      <AuthContext.Provider value={{ token, isLoggedIn, onLogin, logout, coworker }}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <NavBar logo={logo} />
              <main className="max-w-7xl w-full sm:w-8/12 mx-auto p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={isLoggedIn() ? <Offices /> : <Login />} />
                  {!isLoggedIn() && <Route path="/login" element={<Login />} />}
                  {isLoggedIn() && <Route path="/offices" element={<Offices />} />}
                  {isLoggedIn() && <Route path="/organizations" element={<Organizations />} />}
                  {isLoggedIn() && <Route path="/organizations/:orgId" element={<OrganizationDetails />} />}
                  <Route path="*" element={isLoggedIn() ? <Offices /> : <Login />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </Provider>
      </AuthContext.Provider>
    </StrictMode>
  );
};

export default App;
