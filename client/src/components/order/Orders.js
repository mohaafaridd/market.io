import React, { useContext, useEffect } from 'react';
import uuid from 'uuid';
import OrderItem from './OrderItem';
import UserContext from '../../context/user/userContext';

const Orders = () => {
	const { getOrders, orders, loading } = useContext(UserContext);

	useEffect(() => {
		getOrders();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <h4>loading orders</h4>;
	}

	return (
		<div className='secondary-tile orders'>
			<ul>
				{orders.map(order => (
					<OrderItem key={uuid.v4()} order={order} />
				))}
			</ul>
		</div>
	);
};

export default Orders;
