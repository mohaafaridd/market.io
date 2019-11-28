import React, { useContext } from 'react';
import numeral from 'numeral';

import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';

const ProductCard = ({ product }) => {
	const { client } = useContext(AuthContext);
	const { addCart } = useContext(UserContext);
	const { name, description, price, discount } = product;
	const discounted = (1 - discount / 100) * price;
	const image = Buffer.from(product.image.data).toString('base64');

	return (
		<li className='product-container'>
			<figure className='tile product'>
				<img src={`data:image/jpeg;base64,${image}`} alt={`${name}`} />
				<h5 className='title'>{name}</h5>

				<section className='prices'>
					<p className={`${discount > 0 ? 'discounted-price' : 'price'}`}>
						{numeral(price).format('$0,0.00')}
					</p>

					{discount > 0 && (
						<p className='price'>{numeral(discounted).format('$0,0.00')}</p>
					)}
				</section>
				{client && client.role === 'User' && (
					<section className='user-action'>
						<button
							className='btn btn-primary'
							onClick={e => addCart(product, 'product')}
						>
							<i className='fas fa-shopping-cart mr-2'></i>
							Cart
						</button>
						<button className='btn btn-danger'>
							<i className='fas fa-heart mr-2'></i>
							Wishlist
						</button>

						{/* Planned: Favorites */}
						{/* dis-planned: Bundle */}
					</section>
				)}
			</figure>
		</li>
	);
};

export default ProductCard;
