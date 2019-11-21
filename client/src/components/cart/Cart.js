import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';
import numeral from 'numeral';
import CartBundleItem from './CartBundleItem';
import CartProductItem from './CartProductItem';
import CartContext from '../../context/cart/cartContext';
import UserContext from '../../context/user/userContext';
const Carts = () => {
	const { createOrder } = useContext(CartContext);

	const { loading, carts, getCarts, clearCart } = useContext(UserContext);

	useEffect(() => {
		getCarts();
		// eslint-disable-next-line
	}, []);

	const onClearCart = e => {
		clearCart();
	};

	if (loading) {
		return <h4>Loading</h4>;
	}

	const [bundles, products, bill] = carts;

	return (
		<section className='secondary-tile cart'>
			<div className='tile clear-btn'>
				<button
					className={
						carts.length === 0 || carts[2] === 0
							? 'btn btn-disabled'
							: 'btn btn-grayed'
					}
					onClick={onClearCart}
					disabled={carts.length === 0 || carts[2] === 0}
				>
					Clear Cart
				</button>
			</div>
			<ul>
				{products &&
					products.map(cart => <CartProductItem key={uuid.v4()} cart={cart} />)}
				{bundles &&
					bundles.map(cart => <CartBundleItem key={uuid.v4()} cart={cart} />)}
			</ul>
			<div className='tile checkout'>
				<div className='alt-tile bill'>
					<p>
						{bill
							? numeral(bill).format('$0,0.00')
							: numeral(0).format('$0,0.00')}
					</p>
				</div>
				<button
					className={
						carts.length === 0 || carts[2] === 0
							? 'btn btn-disabled'
							: 'btn btn-accent'
					}
					disabled={carts.length === 0 || carts[2] === 0}
					onClick={createOrder}
				>
					Checkout
				</button>
			</div>
		</section>
	);
};

export default Carts;
