import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const { error, isAuthenticated, loading, register, setLoading } = useContext(
    AuthContext
  );
  const history = useHistory();

  if (isAuthenticated) {
    history.push('/');
  }

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'User',
  });

  const { name, email, phone, password, role } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      phone.trim() === '' ||
      password.trim() === '' ||
      role.trim() === ''
    ) {
      console.log('Please enter all fields');
    } else {
      setLoading();
      register(user);
    }
  };

  if (loading) {
    return <h4>Loading</h4>;
  }

  return (
    <section>
      <h3>Register</h3>

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
          {error && error.name && <small>{error.name.msg}</small>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            required
            value={email}
            onChange={onChange}
          />
          {error && error.email && <small>{error.email.msg}</small>}
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='phone'
            name='phone'
            id='phone'
            required
            value={phone}
            onChange={onChange}
          />
          {error && error.phone && <small>{error.phone.msg}</small>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={password}
            onChange={onChange}
            autoComplete='current-password'
          />
          {error && error.password && <small>{error.password.msg}</small>}
        </div>
        <div className='form-group'>
          <label>Register as</label>
          <input
            type='radio'
            name='role'
            required
            value='User'
            onChange={onChange}
          />{' '}
          User
          <input
            type='radio'
            name='role'
            required
            value='Store'
            onChange={onChange}
          />{' '}
          Store
        </div>

        <input type='submit' value='Register' />
      </form>
    </section>
  );
};

export default Register;
