import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';

const SearchItem = ({ product }) => {
	const { name, price, discount } = product;
	const { client } = useContext(AuthContext);
	const { addToCart } = useContext(UserContext);

	const onAddToCart = e => {
		addToCart(product, 'product');
	};

	const userLinks = <button onClick={onAddToCart}>add to cart</button>;

	return (
		<li>
			<p>{name}</p>
			<p>${price}</p>
			<p>{discount}%</p>
			{client && client.role === 'User' && userLinks}
		</li>
	);
};

export default SearchItem;
