import React, { Fragment } from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';

/* Components */
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <CookiesProvider>
      <AuthState>
        <Router>
          <Fragment>
            <Navbar />

            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </Router>
      </AuthState>
    </CookiesProvider>
  );
}

export default App;
