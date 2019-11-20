import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';
import CartState from './context/cart/CartState';
import OrderState from './context/order/OrderState';
import StoreState from './context/store/StoreState';

/* Components */

/* Pages */
import Home from './components/pages/Home';

console.log('here');

function App() {
	return (
		<CookiesProvider>
			<AuthState>
				<CartState>
					<OrderState>
						<StoreState>
							<Router>
								<Home />
							</Router>
						</StoreState>
					</OrderState>
				</CartState>
			</AuthState>
		</CookiesProvider>
	);
}

export default App;
