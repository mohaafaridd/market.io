import React, { Fragment, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Search from '../search/Search';
import StoreDashboard from './StoreDashboard';
import UserDashboard from './UserDashboard';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Product from './Product';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const { loadClient, loading } = useContext(AuthContext);

	// Loading Client when the use enters the website
	useEffect(() => {
		loadClient();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <h4>Loading User</h4>;
	}

	return (
		<section className='home-grid'>
			<Navbar />

			<main className='flex flex-col'>
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route path='/store' component={StoreDashboard} />
					<Route path='/user' component={UserDashboard} />
					<Route path='/search' component={Search} />
					<Route path='/products/:id' component={Product} />
				</Switch>
			</main>

			<Footer />
		</section>
	);
};

export default Home;
