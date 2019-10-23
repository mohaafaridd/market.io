import React, { useContext, Fragment } from 'react';
import AuthContext from '../../../context/auth/authContext';
import ProductContext from '../../../context/product/productContext';

const ProductItem = ({ product }) => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { name, price, store } = product;
  const image = Buffer.from(product.image.data).toString('base64');
  const { client } = authContext;
  const { setCurrent, deleteProduct } = productContext;

  // console.log('image', Buffer.from(image).toString('base64'));

  const editProduct = () => {
    setCurrent(product);
  };

  const onDelete = () => {
    deleteProduct(product);
  };

  const owner = (
    <Fragment>
      <a href='#!'>Add to Bundle</a>
      <a href='#!' onClick={editProduct}>
        Edit
      </a>
      <a href='#!' onClick={onDelete}>
        Delete
      </a>
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
      <img src={`data:image/jpeg;base64,${image}`} alt='' />
      <h4>{name}</h4>
      <p>${price}</p>
      {client && client._id === store && owner}
      {client && client.role === 'User' && user}
    </div>
  );
};

export default ProductItem;
