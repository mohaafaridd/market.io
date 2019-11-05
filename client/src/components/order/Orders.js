import React, { useContext, useEffect } from 'react';
import OrderItem from './OrderItem';
import OrderContext from '../../context/order/orderContext';
const Orders = () => {
  const { getOrders, orders } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1>User Orders</h1>
      <ul>
        {orders.map(order => (
          <OrderItem order={order} />
        ))}
      </ul>
    </div>
  );
};

export default Orders;
