import React, { Fragment, useContext, useState, useEffect } from 'react';
import BundleContext from '../../../context/bundle/bundleContext';
const AddBundle = () => {
  const bundleContext = useContext(BundleContext);
  const { clearBundle, createBundle, updateBundle, bundle } = bundleContext;
  const [state, setState] = useState({
    _id: undefined,
    name: '',
  });

  useEffect(() => {
    setState({
      _id: bundle ? bundle._id : undefined,
      name: bundle ? bundle.name : '',
    });
  }, [bundle]);

  const { name } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (bundle) {
      updateBundle(state);
    } else {
      createBundle(state);
    }
  };
  const onClear = e => {
    e.preventDefault();
    clearBundle();
  };

  return (
    <Fragment>
      <h3>{bundle ? 'Edit Bundle' : 'Add Bundle'}</h3>
      <button disabled={!!!bundle} onClick={onClear}>
        Clear
      </button>
      <form onSubmit={onSubmit}>
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
        <button type='submit'>{bundle ? 'Edit Bundle' : 'Add Bundle'}</button>
      </form>

      {/* <div>
        <h3>Add Products to bundle</h3>
        <button>Clear</button>
        <form>
          <div className='form-group'>
            <label htmlFor='products'>Products</label>
            <select name='products' id='products'>
              <option disabled selected>
                Select a product
              </option>
              <option value='iphone-x'>iPhone X</option>
              <option value='pixel-4'>Pixel 4</option>
              <option value='note-10'>Note 10</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='discount'>Discount (%)</label>
            <input type='text' name='discount' id='discount' required />
          </div>

          <div className='form-group'>
            <label htmlFor='price'>Price after discount</label>
            <input type='text' name='price' id='price' readOnly disabled />
          </div>
          <button type='submit'>Add</button>
        </form>
      </div>

      <div>
        <h3>Products in bundle</h3>
        <p>Price: 2500</p>
        <p>Saved: 500</p>
        <ul>
          <li>
            <span>iPhone X</span>
            <span>4%</span>
            <span>$900</span>
            <button>Edit</button>
            <button>Delete</button>
          </li>
          <li>
            <span>Google Pixel 4</span>
            <span>2%</span>
            <span>$700</span>
            <button>Edit</button>
            <button>Delete</button>
          </li>
          <li>
            <span>Galaxy Note 10</span>
            <span>3%</span>
            <span>$900</span>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        </ul>
      </div> */}
    </Fragment>
  );
};

export default AddBundle;
