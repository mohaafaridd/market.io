import React, { useContext, Fragment } from 'react';
import ProductContext from '../../../context/product/productContext';

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);

  product.image =
    product.image && Buffer.from(product.image.data).toString('base64');
  const { name, price, image } = product;
  const { setCurrent, deleteProduct } = productContext;

  // console.log('image', Buffer.from(image).toString('base64'));

  const editProduct = () => {
    setCurrent(product);
  };

  const onDelete = () => {
    deleteProduct(product);
  };

  return (
    <div>
      <img src={`data:image/jpeg;base64,${image}`} alt='product image' />
      <h4>{name}</h4>
      <p>${price}</p>
      <a href='#!'>Add to Bundle</a>
      <a href='#!' onClick={editProduct}>
        Edit
      </a>
      <a href='#!' onClick={onDelete}>
        Delete
      </a>
    </div>
  );
};

export default ProductItem;
