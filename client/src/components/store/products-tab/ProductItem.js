import React, { useContext, Fragment } from 'react';
import ProductContext from '../../../context/product/productContext';

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);
  const { name, price, image } = product;
  const { setCurrent, deleteProduct } = productContext;

  const editProduct = () => {
    setCurrent(product);
  };

  const onDelete = () => {
    deleteProduct(product);
  };

  return (
    <div>
      {image ? (
        <img
          src={`data:image/jpeg;base64,${Buffer.from(image.data).toString(
            'base64'
          )}`}
          alt='product image'
        />
      ) : (
        <p>No Image for this product</p>
      )}
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
