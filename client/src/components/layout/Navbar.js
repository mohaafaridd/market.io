import React, { Fragment, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import GeneralContext from '../../context/general/generalContext';

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, client, logout } = authContext;
	const { initialSearch } = useContext(GeneralContext);
	const text = useRef('');
	let history = useHistory();

	const onLogout = e => {
		logout();
	};

	const guestLinks = (
		<Fragment>
			<li>
				<Link className='btn btn-accent' to='/register'>
					Register
				</Link>
			</li>
			<li>
				<Link className='btn btn-outlined btn-accent-border' to='/login'>
					Login
				</Link>
			</li>
		</Fragment>
	);

	const clientLinks = (
		<Fragment>
			{client && client.role === 'User' ? (
				<Fragment>
					<li>
						<Link className='btn btn-accent' to='/user/cart'>
							Cart
						</Link>
					</li>
					<li>
						<Link className='btn btn-accent' to='/user/orders'>
							Orders
						</Link>
					</li>
				</Fragment>
			) : (
				<li>
					<Link className='btn btn-accent' to='/store'>
						Dashboard
					</Link>
				</li>
			)}
			<li>
				<a
					className='btn btn-outlined btn-accent-border'
					href='#!'
					onClick={onLogout}
				>
					Logout
				</a>
			</li>
		</Fragment>
	);

	const search = () => {
		if (text.current.value.trim() !== '') {
			history.push(`/search?name=${text.current.value}`);
			initialSearch(text.current.value);
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		search();
	};

	const onInputSubmit = e => {
		if (e.key === 'Enter') {
			search();
		}
	};

	return (
		<nav className='nav'>
			<span>
				<Link className='title secondary-text' to='/'>
					Market
				</Link>
			</span>

			<div className='search-input'>
				{/* <form onSubmit={onSubmit}> */}
				<input
					className='input'
					type='text'
					placeholder='Search products...'
					ref={text}
					onKeyPress={onInputSubmit}
				/>
				<button onClick={onSubmit} className='btn btn-accent'>
					<i className='fas fa-search'></i>
				</button>
				{/* </form> */}
			</div>

			<ul>{isAuthenticated ? clientLinks : guestLinks}</ul>
		</nav>
	);
};

export default Navbar;
