// import React, { Fragment, useContext, useEffect, useState } from 'react';
// import BundleContext from '../../../context/bundle/bundleContext';
// import ProductContext from '../../../context/product/productContext';
// import AuthContext from '../../../context/auth/authContext';

// const AddProduct = () => {
//   const bundleContext = useContext(BundleContext);
//   const productContext = useContext(ProductContext);
//   const authContext = useContext(AuthContext);
//   const {
//     bundle,
//     products: productsInBundle,
//     product: currentProduct,
//     addBundleProduct,
//   } = bundleContext;
//   const { getProducts, products: storeProducts } = productContext;
//   const { client } = authContext;
//   const [state, setState] = useState({
//     product: '',
//     originalPrice: '',
//     discount: '',
//     priceAfterDiscount: '',
//   });

//   // gets products from store
//   useEffect(() => {
//     if (client) {
//       getProducts(client._id);
//     }
//   }, [client]);

//   const onOptionChange = e => {
//     const product = storeProducts.find(
//       p => p._id.toString() === e.target.value
//     );
//     setState({
//       ...state,
//       product: product._id,
//       originalPrice: product.price,
//     });
//   };

//   const onDiscountChange = e => {
//     const value = parseFloat(e.target.value);
//     const discount = isNaN(value) ? 0 : value > 100 ? 100 : value;

//     setState({
//       ...state,
//       discount,
//       priceAfterDiscount: (state.originalPrice * (100 - discount)) / 100,
//     });
//   };

//   const onSubmit = e => {
//     e.preventDefault();
//     addBundleProduct(bundle, state);
//   };

//   return (
//     <Fragment>
//       <h3>Add Products to bundle</h3>
//       <form onSubmit={onSubmit}>
//         <div className='form-group'>
//           <label htmlFor='products'>Products</label>
//           <select
//             name='products'
//             id='products'
//             defaultValue='DEFAULT'
//             onChange={onOptionChange}
//           >
//             <option disabled value='DEFAULT'>
//               Select a product
//             </option>
//             {storeProducts.map(product => (
//               <option key={product._id} value={product._id}>
//                 {product.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='discount'>Discount (%)</label>
//           <input
//             type='text'
//             name='discount'
//             id='discount'
//             required
//             value={state.discount}
//             onChange={onDiscountChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='price'>Price after discount</label>
//           <input
//             type='text'
//             name='price'
//             id='price'
//             min='0'
//             max='100'
//             readOnly
//             disabled
//             value={state.priceAfterDiscount}
//           />
//         </div>
//         <button type='submit'>Add</button>
//       </form>
//     </Fragment>
//   );
// };

// export default AddProduct;

import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import BundleContext from '../../../context/bundle/bundleContext';
import ProductContext from '../../../context/product/productContext';

const AddProduct = () => {
  const { client } = useContext(AuthContext);
  const {
    bundle,
    product,
    products,
    setProduct,
    addBundleProduct,
  } = useContext(BundleContext);
  const { getProducts, products: storeProducts } = useContext(ProductContext);

  const [state, setState] = useState({
    inBundle: false,
    discount: 0,
  });
  const { inBundle, discount } = state;

  // 1 - Get all products that this store has
  useEffect(() => {
    if (client) {
      const { _id } = client;
      getProducts(_id);
    }
  }, [client]);

  // 2 - on product change
  useEffect(() => {
    if (product) {
      const item = products.find(p => p.product._id === product._id);
      if (item) {
        setState({ ...state, inBundle: true, discount: item.discount });
      } else {
        setState({ ...state, inBundle: false, discount: 0 });
      }
    }
  }, [product, bundle, products]);

  // 3 - on select option change
  const onOptionChange = e => {
    const _id = e.target.value;
    const item = storeProducts.find(i => _id === i._id);
    if (item) {
      setProduct(item);
    }
  };

  // 4 - on discount change
  const onDiscountChange = e => {
    const value = parseFloat(e.target.value);
    const discount = isNaN(value) ? 0 : value > 100 ? 100 : value;

    setState({ ...state, discount });
  };

  // 5 - Submit product to bundle (Add or Edit)
  const onSubmit = e => {
    e.preventDefault();
    addBundleProduct(bundle, product, discount);
  };

  return (
    <Fragment>
      <h3>{inBundle ? 'Edit Product' : 'Add Product'}</h3>
      <form onSubmit={onSubmit}>
        <select
          name='products'
          id='products'
          onChange={onOptionChange}
          value={product ? product._id : 'default'}
        >
          <option value='default' disabled>
            Select a product
          </option>
          {storeProducts.map(product => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type='text'
          name='discount'
          value={discount}
          onChange={onDiscountChange}
        />
        <input
          type='text'
          name='priceAfterDiscount'
          value={product ? product.price * (1 - discount / 100) : 0}
          disabled
        />
        <button type='submit'>Submit</button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
