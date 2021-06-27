import logo from 'assets/logo.svg';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import { LocalStorageKey } from 'models/constants';
import { AuthToken } from 'models/types';
import Login from 'pages/Login';
import Offices from 'pages/Offices';
import Organizations from 'pages/Organizations';
import { FC, StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { AuthContext } from './authContext';

const App: FC = () => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [coworkerId, setCoworkerId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(LocalStorageKey.AUTH);
    const storedCoworkerId = localStorage.getItem(LocalStorageKey.COWORKER_ID);
    if (storedToken) {
      try {
        setToken(JSON.parse(storedToken));
      } catch {
        // In case invalid JSON string is stored in localStorage
        setToken(null);
      }
    }

    if (storedCoworkerId) {
      try {
        setCoworkerId(JSON.parse(storedCoworkerId));
      } catch {
        // In case invalid JSON string is stored in localStorage
        setCoworkerId(null);
      }
    }
  }, []);

  const onLogin = (onLoginToken: AuthToken | null, onLoginCoworkerId: string | null) => {
    setToken(onLoginToken);
    setCoworkerId(onLoginCoworkerId);
    localStorage.setItem(LocalStorageKey.AUTH, JSON.stringify(onLoginToken));
    localStorage.setItem(LocalStorageKey.COWORKER_ID, onLoginCoworkerId ?? '');
  };

  const logout = () => {
    setToken(null);
    setCoworkerId(null);
    localStorage.removeItem(LocalStorageKey.AUTH);
    localStorage.removeItem(LocalStorageKey.COWORKER_ID);
  };

  const isLoggedIn = () => !!token && new Date().valueOf() < token.ExpiresIn;

  return (
    <StrictMode>
      <AuthContext.Provider value={{ token, isLoggedIn, onLogin, logout, coworkerId }}>
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
