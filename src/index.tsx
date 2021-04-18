import App from 'App';
import logo from 'assets/logo.svg';
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import 'main.css';
import Login from 'pages/Login';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';
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
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
