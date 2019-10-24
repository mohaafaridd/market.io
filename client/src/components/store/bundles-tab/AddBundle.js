import React, { Fragment } from 'react';
const AddBundle = () => {
  return (
    <Fragment>
      <div>
        <h3>Add Bundle</h3>
        <button>Clear</button>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' required />
          </div>

          <button type='submit'>Create</button>
        </form>
      </div>

      <div>
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
      </div>
    </Fragment>
  );
};

export default AddBundle;
