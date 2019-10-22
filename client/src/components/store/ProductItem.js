import React, { useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const ProductItem = ({ product }) => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { name, price, store } = product;

  const { client } = authContext;
  const { setCurrent } = productContext;

  const editProduct = () => {
    setCurrent(product);
  };

  const owner = (
    <Fragment>
      <a href='#!'>Add to Bundle</a>
      <a href='#!' onClick={editProduct}>
        Edit
      </a>
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
