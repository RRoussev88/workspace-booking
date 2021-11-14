import { ChakraProvider } from '@chakra-ui/react';
import { FC, StrictMode, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.svg';
import { AuthContext } from './authContext';
import { Footer, NavBar } from './components';
import { AuthToken, CoworkerPayload, LocalStorageKey } from './models';
import {
  Login,
  OfficeDetails,
  OfficeReservations,
  Offices,
  OrganizationDetails,
  Organizations,
  OrgOffices,
} from './pages';
import { store } from './store';

const App: FC = () => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [coworker, setCoworker] = useState<CoworkerPayload | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token && new Date().valueOf() < token.ExpiresIn);

  const onLogin = (onLoginToken: AuthToken | null, onLoginCoworker: CoworkerPayload | null) => {
    setToken(onLoginToken);
    setCoworker(onLoginCoworker);
    localStorage.setItem(LocalStorageKey.AUTH, JSON.stringify(onLoginToken));
    localStorage.setItem(LocalStorageKey.COWORKER, JSON.stringify(onLoginCoworker));
  };

  const onLogout = () => {
    setToken(null);
    setCoworker(null);
    localStorage.removeItem(LocalStorageKey.AUTH);
    localStorage.removeItem(LocalStorageKey.COWORKER);
  };

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

  useEffect(() => {
    setIsLoggedIn(!!token && new Date().valueOf() < token.ExpiresIn);

    const timeout = token
      ? setTimeout(() => {
          setIsLoggedIn(!!token && new Date().valueOf() < token.ExpiresIn);
        }, new Date().valueOf() - token.ExpiresIn)
      : null;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [token]);

  return (
    <StrictMode>
      <ChakraProvider>
        <AuthContext.Provider value={{ token, isLoggedIn, onLogin, onLogout, coworker }}>
          <Provider store={store}>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <NavBar logo={logo} />
                <main className="max-w-7xl w-full sm:w-8/12 mx-auto p-4 sm:p-6 lg:p-8">
                  <Routes>
                    {!isLoggedIn && <Route path="/login" element={<Login />} />}
                    {isLoggedIn && <Route path="/offices" element={<Offices />} />}
                    {isLoggedIn && <Route path="/organizations" element={<Organizations />} />}
                    {isLoggedIn && <Route path="/organizations/:orgId" element={<OrganizationDetails />} />}
                    {isLoggedIn && <Route path="/organizations/:orgId/offices" element={<OrgOffices />} />}
                    {isLoggedIn && (
                      <Route path="/organizations/:orgId/offices/:officeId" element={<OfficeDetails />} />
                    )}
                    {isLoggedIn && (
                      <Route
                        path="/organizations/:orgId/offices/:officeId/reservations"
                        element={<OfficeReservations />}
                      />
                    )}
                    <Route path="*" element={<Navigate to={isLoggedIn ? '/organizations' : '/login'} />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </Provider>
        </AuthContext.Provider>
        <ToastContainer />
      </ChakraProvider>
    </StrictMode>
  );
};

export default App;
