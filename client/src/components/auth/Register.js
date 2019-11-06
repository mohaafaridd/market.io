import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import useForm from 'react-hook-form';

const Register = () => {
  const {
    error: backendErrors,
    isAuthenticated,
    register: registerUser,
  } = useContext(AuthContext);

  const history = useHistory();
  if (isAuthenticated) {
    history.push('/');
  }

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Register</h3>

      <div className='form-group'>
        <input
          name='name'
          placeholder='Name'
          ref={register({ required: true, maxlength: 20, minLength: 2 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <small>Name is required</small>
        )}
        {errors.name && errors.name.type === 'minLength' && (
          <small>Name must not be lower than 2 characters</small>
        )}
        {errors.name && errors.name.type === 'maxlength' && (
          <small>Name must not exceed 20 characters</small>
        )}
        {backendErrors && backendErrors.name && (
          <small>{backendErrors.name.msg}</small>
        )}
      </div>

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
        {backendErrors && backendErrors.email && (
          <small>{backendErrors.email.msg}</small>
        )}
      </div>

      <div className='form-group'>
        <input
          name='phone'
          placeholder='Phone'
          ref={register({ required: true, pattern: /^01(\d{9})$/ })}
        />
        {errors.phone && errors.phone.type === 'required' && (
          <small>Phone is required</small>
        )}
        {errors.phone && errors.phone.type === 'pattern' && (
          <small>Phone number has to be Egyptian</small>
        )}
        {backendErrors && backendErrors.phone && (
          <small>{backendErrors.phone.msg}</small>
        )}
      </div>

      <div className='form-group'>
        <input
          type='password'
          name='password'
          placeholder='Password'
          ref={register({ required: true, minLength: 6, maxLength: 100 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <small>Password is required</small>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <small>Password must not be lower than 6 characters</small>
        )}
        {errors.password && errors.password.type === 'maxlength' && (
          <small>Password must not exceed 100 characters</small>
        )}
        {backendErrors && backendErrors.password && (
          <small>{backendErrors.password.msg}</small>
        )}
      </div>

      <div className='form-group'>
        <input
          type='password'
          name='passwordConfirm'
          placeholder='Confirm Password'
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 100,
            validate: value => value === watch('password'),
          })}
        />
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'required' && (
            <small>Password confirmation is required</small>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'minLength' && (
            <small>
              Password confirmation must not be lower than 6 characters
            </small>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'maxlength' && (
            <small>Password confirmation must not exceed 100 characters</small>
          )}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'validate' && (
            <small>Passwords have to match</small>
          )}
      </div>

      <div className='form-group'>
        <label>Register as</label>
        <input
          name='role'
          type='radio'
          value='User'
          ref={register({ required: true })}
        />{' '}
        User
        <input
          name='role'
          type='radio'
          value='Store'
          ref={register({ required: true })}
        />{' '}
        Store
        {errors.role && errors.role.type === 'required' && (
          <small>A role must be selected</small>
        )}
      </div>

      <input type='submit' />
    </form>
  );
};

export default Register;
