import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

/* Contexts */
import AuthState from './context/auth/AuthState';
import GeneralState from './context/general/GeneralState';
import StoreState from './context/store/StoreState';
import UserState from './context/user/UserState';

/* Components */

/* Pages */
import Home from './components/pages/Home';

function App() {
	return (
		<CookiesProvider>
			<AuthState>
				<GeneralState>
					<StoreState>
						<UserState>
							<Router>
								<Home />
							</Router>
						</UserState>
					</StoreState>
				</GeneralState>
			</AuthState>
		</CookiesProvider>
	);
}

export default App;
