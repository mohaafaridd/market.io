import React, { Fragment } from 'react';
import { CookiesProvider } from 'react-cookie';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';

/* Components */
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';

function App() {
  return (
    <CookiesProvider>
      <AuthState>
        <Fragment>
          <Navbar />

          <Register />
        </Fragment>
      </AuthState>
    </CookiesProvider>
  );
}

export default App;
