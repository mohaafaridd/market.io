import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Login</h3>

      <div className='form-group'>
        <input
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
          type='password'
          name='password'
          placeholder='Password'
          ref={register({ required: true })}
        />
        {errors.password && errors.password.type === 'required' && (
          <small>Password is required</small>
        )}
      </div>

      {backendErrors && backendErrors.public && (
        <small>{backendErrors.public.msg}</small>
      )}
      <input type='submit' />
    </form>
  );
};

export default Login;
