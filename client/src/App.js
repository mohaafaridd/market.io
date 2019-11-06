import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';
import ProductState from './context/product/ProductState';
import BundleState from './context/bundle/BundleState';
import CartState from './context/cart/CartState';
import OrderState from './context/order/OrderState';
import StoreState from './context/store/StoreState';

/* Components */

/* Pages */
import Home from './components/pages/Home';

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
                    <Home />
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
