import React, { Fragment, useState } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    category: null,
    manufacturer: null,
    name: null,
    description: null,
    color: null,
    amount: null,
    price: null,
    discount: null,
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

  return (
    <Fragment>
      <h3>Add product</h3>
      <form>
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
