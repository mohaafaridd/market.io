import React, { Fragment, useContext, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
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

	const onDrop = files => postProductImage(current, files[0]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'image/*',
		multiple: false,
	});

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
			updateProduct({ ...current, ...data });
		} else {
			addProduct(data);
		}
	};

	return (
		<section className='add-product-partition'>
			<div className='tile'>
				<h3>{current ? 'Edit' : 'Add'} Product</h3>
				{current && current.image && (
					<img
						className='product-image'
						src={`data:image/jpeg;base64,${current.image}`}
						alt={`${current.name}`}
					/>
				)}
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
						{errors.manufacturer &&
							errors.manufacturer.type === 'minLength' && (
								<small>manufacturer has minimum length of 2</small>
							)}
						{errors.manufacturer &&
							errors.manufacturer.type === 'maxLength' && (
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
			</div>
			<div className='tile secondary-tile'>
				{!current ? (
					<p>Please select a product to add an image</p>
				) : (
					<Fragment>
						<form>
							<div {...getRootProps()} className='dropzone'>
								<input {...getInputProps()} />
								{isDragActive ? (
									<p>Drop product image here ...</p>
								) : (
									<p>Drop product image here</p>
								)}
							</div>
						</form>
					</Fragment>
				)}
			</div>
		</section>
	);
};

export default AddProduct;
