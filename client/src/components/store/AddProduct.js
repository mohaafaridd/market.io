import React, { Fragment, useState, useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const AddProduct = () => {
  const productContext = useContext(ProductContext);
  const { addProduct } = productContext;

  const [product, setProduct] = useState({
    category: '',
    manufacturer: '',
    name: '',
    description: '',
    color: '',
    amount: '',
    price: '',
    discount: '',
  });
  const {
    category,
    manufacturer,
    name,
    description,
    color,
    amount,
    price,
    discount,
  } = product;

  const onChange = e =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addProduct(product);
  };

  return (
    <Fragment>
      <h3>Add product</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            name='category'
            id='category'
            required
            value={category}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='manufacturer'>Manufacturer</label>
          <input
            type='text'
            name='manufacturer'
            id='manufacturer'
            required
            value={manufacturer}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            required
            value={name}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description</label>

          <textarea
            name='description'
            id='description'
            required
            onChange={onChange}
          >
            {description}
          </textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='color'>Color</label>
          <input
            type='text'
            name='color'
            id='color'
            required
            value={color}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='text'
            name='amount'
            id='amount'
            required
            value={amount}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='text'
            name='price'
            id='price'
            required
            value={price}
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='discount'>Discount</label>
          <input
            type='text'
            name='discount'
            id='discount'
            required
            value={discount}
            onChange={onChange}
          />
        </div>

        <input type='submit' value='Add Product' />
      </form>
    </Fragment>
  );
};

export default AddProduct;
