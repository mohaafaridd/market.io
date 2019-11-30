import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useForm from 'react-hook-form';

import AuthContext from '../../context/auth/authContext';

const Login = () => {
	const {
		error: backendErrors,
		isAuthenticated,
		login: loginUser,
	} = useContext(AuthContext);
	const history = useHistory();
	if (isAuthenticated) {
		history.push('/');
	}
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = data => {
		loginUser(data);
	};

	return (
		<form className='tile form register-form' onSubmit={handleSubmit(onSubmit)}>
			<h3 className='text-4xl py-2 secondary-text'>Login</h3>

			<div className='form-group'>
				<input
					className='input'
					name='email'
					placeholder='Email'
					ref={register({ required: true, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && errors.email.type === 'required' && (
					<small>Email is required</small>
				)}
				{errors.email && errors.email.type === 'pattern' && (
					<small>This isn't an email</small>
				)}
			</div>

			<div className='form-group'>
				<input
					className='input'
					type='password'
					name='password'
					placeholder='Password'
					ref={register({ required: true })}
				/>
				{errors.password && errors.password.type === 'required' && (
					<small>Password is required</small>
				)}
			</div>

			<div className='form-group'>
				{backendErrors && backendErrors.public && (
					<small className='self-center mb-4'>{backendErrors.public.msg}</small>
				)}
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
				<p className='self-center mt-4'>
					<Link to='/register'>Don't have an account?</Link>
				</p>
			</div>
		</form>
	);
};

export default Login;
