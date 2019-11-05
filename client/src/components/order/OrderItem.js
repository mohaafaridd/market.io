import React from 'react';

const OrderItem = ({ order }) => {
  const { _id, type, amount, bill, createdAt, updatedAt } = order;
  return (
    <li>
      <p>ID: {_id}</p>
      <p>{type}</p>
      <p>amount {amount}</p>
      <p>payment {bill}</p>
      <p>ordered at {createdAt}</p>
      <p>delivered at {createdAt === updatedAt ? 'N/A' : updatedAt}</p>
    </li>
  );
};

export default OrderItem;
