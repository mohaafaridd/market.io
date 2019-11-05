import React, { Fragment } from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';
import ProductState from './context/product/ProductState';
import BundleState from './context/bundle/BundleState';
import CartState from './context/cart/CartState';
import OrderState from './context/order/OrderState';
import StoreState from './context/store/StoreState';

/* Components */
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

/* Pages */
import StoreDashboard from './components/pages/StoreDashboard';
import UserDashboard from './components/pages/UserDashboard';
import Search from './components/pages/Search';

function App() {
  return (
    <CookiesProvider>
      <AuthState>
        <ProductState>
          <BundleState>
            <CartState>
              <OrderState>
                <StoreState>
                  <Router>
                    <Fragment>
                      <Navbar />

                      <Switch>
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route path='/store' component={StoreDashboard} />
                        <Route path='/user' component={UserDashboard} />
                        <Route path='/search' component={Search} />
                      </Switch>
                    </Fragment>
                  </Router>
                </StoreState>
              </OrderState>
            </CartState>
          </BundleState>
        </ProductState>
      </AuthState>
    </CookiesProvider>
  );
}

export default App;
