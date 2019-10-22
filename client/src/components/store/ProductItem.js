import React, { useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';

const ProductItem = ({ product: { name, price, store } }) => {
  const authContext = useContext(AuthContext);
  const { client } = authContext;

  const owner = (
    <Fragment>
      <a href='#!'>Add to Bundle</a>
      <a href='#!'>Edit</a>
      <a href='#!'>Delete</a>
    </Fragment>
  );

  const user = (
    <Fragment>
      <a href='#!'>Add to cart</a>
      <a href='#!'>Wishlist</a>
    </Fragment>
  );

  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
      {client && client._id === store && owner}
      {client && client.role === 'User' && user}
    </div>
  );
};

export default ProductItem;