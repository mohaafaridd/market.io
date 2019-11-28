import React, { useContext } from 'react';
import numeral from 'numeral';
import uuid from 'uuid';

import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';

const BundleCard = ({ bundle }) => {
	const { client } = useContext(AuthContext);
	const { addCart } = useContext(UserContext);
	const { name, products, bill } = bundle;
	console.log('bundle', bundle);
	return (
		<li className='bundle-container'>
			<div className='tile bundle'>
				<h5>{name}</h5>
				<ul>
					{products.map(product => (
						<li key={uuid.v4()} className='rounded bg-gray-900 my-2 p-2'>
							{product.name}
						</li>
					))}
				</ul>

				<section className='prices'>
					<p className='price'>{numeral(bill).format('$0,0.00')}</p>
				</section>

				{client && client.role === 'User' && (
					<section className='user-action'>
						<button
							className='btn btn-primary'
							onClick={e => addCart(bundle, 'bundle')}
						>
							<i className='fas fa-shopping-cart mr-2'></i>
							Cart
						</button>
						<button className='btn btn-danger'>
							<i className='fas fa-heart mr-2'></i>
							Wishlist
						</button>
					</section>
				)}
			</div>
		</li>
	);
};

export default BundleCard;
