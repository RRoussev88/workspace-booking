import logo from 'assets/logo.svg';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import { LocalStorageKey } from 'models/constants';
import Login from 'pages/Login';
import Offices from 'pages/Offices';
import { FC, StrictMode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { AuthContext } from './authContext';
import { AuthToken } from 'models/types';

const App: FC = () => {
  const [token, setToken] = useState<AuthToken | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(LocalStorageKey.AUTH);
    if (storedToken) {
      try {
        setToken(JSON.parse(storedToken));
      } catch {
        // In case invalid JSON string is stored in localStorage
        setToken(null);
      }
    }
  }, []);

  const onLogin = (token: AuthToken | null) => {
    setToken(token);
    localStorage.setItem(LocalStorageKey.AUTH, JSON.stringify(token));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(LocalStorageKey.AUTH);
  };

  const isLoggedIn = () => !!token && new Date().valueOf() < token.ExpiresIn;

  return (
    <StrictMode>
      <AuthContext.Provider value={{ token, isLoggedIn, onLogin, logout }}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <NavBar logo={logo} />
              <main className="max-w-7xl w-8/12 mx-auto p-4 sm:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={isLoggedIn() ? <Offices /> : <Login />} />
                  {!isLoggedIn() && <Route path="/login" element={<Login />} />}
                  {isLoggedIn() && <Route path="/offices" element={<Offices />} />}
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
