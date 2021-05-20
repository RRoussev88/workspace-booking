import App from 'App';
import logo from 'assets/logo.svg';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import 'main.css';
import Login from 'pages/Login';
import Offices from 'pages/Offices';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'store';
import { navigationItems } from 'utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar logo={logo} navItems={navigationItems} />
          <div className="max-w-7xl p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/offices" element={<Offices />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
