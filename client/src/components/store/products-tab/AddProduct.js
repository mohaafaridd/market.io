import React, { Fragment, useState, useContext, useEffect } from 'react';
import useForm from 'react-hook-form';
import ProductContext from '../../../context/product/productContext';

const AddProduct = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const {
    addProduct,
    updateProduct,
    clearCurrent,
    current,
    postProductImage,
  } = useContext(ProductContext);

  useEffect(() => {
    setValue('_id', current ? current._id : undefined);
    setValue('category', current ? current.category : '');
    setValue('manufacturer', current ? current.manufacturer : '');
    setValue('name', current ? current.name : '');
    setValue('description', current ? current.description : '');
    setValue('color', current ? current.color : '');
    setValue('amount', current ? current.amount : '');
    setValue('price', current ? current.price : '');
    setValue('discount', current ? current.discount : '');
    setValue('store', current ? current.store : '');
  }, [current]);

  const onSubmit = data => {
    if (current) {
      console.log('in Add Product');
      console.log('data', data);
      console.log('current', current);
      updateProduct({ ...current, ...data });
    } else {
      addProduct(data);
    }
  };

  return (
    <section className='tile add-product-partition'>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Start */}
        <div className='form-group'>
          <input
            className='input'
            name='category'
            placeholder='Category'
            ref={register({ required: true, minLength: 2, maxLength: 36 })}
          />
          {errors.category && errors.category.type === 'required' && (
            <small>Category is required</small>
          )}
          {errors.category && errors.category.type === 'minLength' && (
            <small>Category has minimum length of 2</small>
          )}
          {errors.category && errors.category.type === 'maxLength' && (
            <small>Category has maximum length of 36</small>
          )}
        </div>
        {/* Category End */}

        {/* Manufacturer Start */}
        <div className='form-group'>
          <input
            className='input'
            name='manufacturer'
            placeholder='Manufacturer'
            ref={register({ required: true, minLength: 2, maxLength: 36 })}
          />
          {errors.manufacturer && errors.manufacturer.type === 'required' && (
            <small>manufacturer is required</small>
          )}
          {errors.manufacturer && errors.manufacturer.type === 'minLength' && (
            <small>manufacturer has minimum length of 2</small>
          )}
          {errors.manufacturer && errors.manufacturer.type === 'maxLength' && (
            <small>manufacturer has maximum length of 36</small>
          )}
        </div>
        {/* Manufacturer End */}

        {/* Name Start */}
        <div className='form-group'>
          <input
            className='input'
            name='name'
            placeholder='Name'
            ref={register({ required: true, minLength: 2, maxLength: 36 })}
          />
          {errors.name && errors.name.type === 'required' && (
            <small>name is required</small>
          )}
          {errors.name && errors.name.type === 'minLength' && (
            <small>name has minimum length of 2</small>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <small>name has maximum length of 36</small>
          )}
        </div>
        {/* Name End */}

        {/* Description Start */}
        <div className='form-group'>
          <textarea
            name='description'
            className='input'
            id='description'
            placeholder='Description'
            ref={register({ required: true, minLength: 2, maxLength: 300 })}
          ></textarea>

          {errors.description && errors.description.type === 'required' && (
            <small>description is required</small>
          )}
          {errors.description && errors.description.type === 'minLength' && (
            <small>description has minimum length of 2</small>
          )}
          {errors.description && errors.description.type === 'maxLength' && (
            <small>description has maximum length of 300</small>
          )}
        </div>
        {/* Description End */}

        {/* Color Start */}
        <div className='form-group'>
          <input
            className='input'
            name='color'
            placeholder='Color'
            ref={register({ required: true, minLength: 2, maxLength: 36 })}
          />
          {errors.color && errors.color.type === 'required' && (
            <small>color is required</small>
          )}
          {errors.color && errors.color.type === 'minLength' && (
            <small>color has minimum length of 2</small>
          )}
          {errors.color && errors.color.type === 'maxLength' && (
            <small>color has maximum length of 36</small>
          )}
        </div>
        {/* Color End */}

        {/* Amount Start */}
        <div className='form-group'>
          <input
            type='number'
            className='input'
            name='amount'
            placeholder='Amount'
            ref={register({ required: true, min: 0 })}
          />
          {errors.amount && errors.amount.type === 'required' && (
            <small>amount is required</small>
          )}
          {errors.amount && errors.amount.type === 'min' && (
            <small>amount can't be less than 0</small>
          )}
        </div>
        {/* Amount End */}

        {/* Price Start */}
        <div className='form-group'>
          <input
            type='number'
            className='input'
            name='price'
            placeholder='Price'
            ref={register({ required: true, min: 0 })}
          />
          {errors.price && errors.price.type === 'required' && (
            <small>Price is required</small>
          )}
          {errors.price && errors.price.type === 'min' && (
            <small>Price can't be less than 0</small>
          )}
        </div>
        {/* Price End */}

        {/* Discount Start */}
        <div className='form-group'>
          <input
            type='number'
            className='input'
            name='discount'
            placeholder='Discount'
            ref={register({ required: true, min: 0, max: 100 })}
          />
          {errors.discount && errors.discount.type === 'required' && (
            <small>Discount is required</small>
          )}
          {errors.discount && errors.discount.type === 'min' && (
            <small>Discount can't be less than 0</small>
          )}
          {errors.discount && errors.discount.type === 'max' && (
            <small>Discount can't be more than 100</small>
          )}
        </div>
        {/* Discount End */}

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      {/* <form>

      </form> */}
    </section>
  );
};

// const AddProduct = () => {
//   const productContext = useContext(ProductContext);

//   const {
//     addProduct,
//     updateProduct,
//     clearCurrent,
//     current,
//     postProductImage,
//   } = productContext;

//   const [image, setImage] = useState(null);

//   const [product, setProduct] = useState({
//     _id: undefined,
//     category: '',
//     manufacturer: '',
//     name: '',
//     description: '',
//     color: '',
//     amount: '',
//     price: '',
//     discount: '',
//     store: '',
//   });

//   useEffect(() => {
//     setProduct({
//       _id: current ? current._id : undefined,
//       category: current ? current.category : '',
//       manufacturer: current ? current.manufacturer : '',
//       name: current ? current.name : '',
//       description: current ? current.description : '',
//       color: current ? current.color : '',
//       amount: current ? current.amount : '',
//       price: current ? current.price : '',
//       discount: current ? current.discount : '',
//       store: current ? current.store : '',
//     });
//   }, [current]);

//   const {
//     category,
//     manufacturer,
//     name,
//     description,
//     color,
//     amount,
//     price,
//     discount,
//   } = product;

//   const onChange = e =>
//     setProduct({ ...product, [e.target.name]: e.target.value });

//   const onSubmit = e => {
//     e.preventDefault();
//     if (current) {
//       updateProduct(product);
//     } else {
//       addProduct(product);
//     }
//   };

//   const onImageSubmit = e => {
//     e.preventDefault();
//     if (current) {
//       postProductImage(current, image);
//     }
//   };

//   const onClear = () => {
//     clearCurrent();
//     setProduct({
//       _id: undefined,
//       category: '',
//       manufacturer: '',
//       name: '',
//       description: '',
//       color: '',
//       amount: '',
//       price: '',
//       discount: '',
//       store: '',
//     });
//   };

//   return (
//     <Fragment>
//       <h3>{current ? 'Edit product' : 'Add product'}</h3>
//       <button onClick={onClear}>Clear</button>
//       <form onSubmit={onSubmit}>
//         <div className='form-group'>
//           <label htmlFor='category'>Category</label>
//           <input
//             type='text'
//             name='category'
//             id='category'
//             required
//             value={category}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='manufacturer'>Manufacturer</label>
//           <input
//             type='text'
//             name='manufacturer'
//             id='manufacturer'
//             required
//             value={manufacturer}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='name'>Name</label>
//           <input
//             type='text'
//             name='name'
//             id='name'
//             required
//             value={name}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='description'>Description</label>

//           <textarea
//             name='description'
//             id='description'
//             required
//             onChange={onChange}
//             value={description}
//           ></textarea>
//         </div>

//         <div className='form-group'>
//           <label htmlFor='color'>Color</label>
//           <input
//             type='text'
//             name='color'
//             id='color'
//             required
//             value={color}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='amount'>Amount</label>
//           <input
//             type='text'
//             name='amount'
//             id='amount'
//             required
//             value={amount}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='price'>Price</label>
//           <input
//             type='text'
//             name='price'
//             id='price'
//             required
//             value={price}
//             onChange={onChange}
//           />
//         </div>

//         <div className='form-group'>
//           <label htmlFor='discount'>Discount</label>
//           <input
//             type='text'
//             name='discount'
//             id='discount'
//             required
//             value={discount}
//             onChange={onChange}
//           />
//         </div>

//         <input type='submit' value={current ? 'Edit Product' : 'Create'} />
//       </form>

//       <form onSubmit={onImageSubmit}>
//         <h3>
//           {current
//             ? `Change Image for ${current.name}`
//             : 'Please select a product to assign an image'}
//         </h3>
//         <div className='form-group'>
//           <label htmlFor='image'>Image</label>
//           <input
//             disabled={!!!current}
//             type='file'
//             name='image'
//             id='image'
//             required
//             onChange={e => setImage(e.target.files[0])}
//           />
//           <button disabled={!!!current || !image} type='submit'>
//             Submit Image
//           </button>
//         </div>
//       </form>
//     </Fragment>
//   );
// };

export default AddProduct;
