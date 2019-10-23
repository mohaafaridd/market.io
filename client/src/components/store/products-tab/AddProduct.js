import React, { Fragment, useState, useContext, useEffect } from 'react';
import ProductContext from '../../../context/product/productContext';
const AddProduct = () => {
  const productContext = useContext(ProductContext);

  const { addProduct, updateProduct, clearCurrent, current } = productContext;

  const [product, setProduct] = useState({
    _id: undefined,
    category: '',
    manufacturer: '',
    name: '',
    description: '',
    color: '',
    amount: '',
    price: '',
    discount: '',
    store: '',
  });

  useEffect(() => {
    setProduct({
      _id: current ? current._id : undefined,
      category: current ? current.category : '',
      manufacturer: current ? current.manufacturer : '',
      name: current ? current.name : '',
      description: current ? current.description : '',
      color: current ? current.color : '',
      amount: current ? current.amount : '',
      price: current ? current.price : '',
      discount: current ? current.discount : '',
      store: current ? current.store : '',
    });
  }, [current]);

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
    if (current) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
  };

  const onClear = () => {
    clearCurrent();
    setProduct({
      _id: undefined,
      category: '',
      manufacturer: '',
      name: '',
      description: '',
      color: '',
      amount: '',
      price: '',
      discount: '',
      store: '',
    });
  };

  return (
    <Fragment>
      <h3>{current ? 'Edit product' : 'Add product'}</h3>
      <button onClick={onClear}>Clear</button>
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
            value={description}
          ></textarea>
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

        <input type='submit' value={current ? 'Edit Product' : 'Create'} />
      </form>
    </Fragment>
  );
};

export default AddProduct;
