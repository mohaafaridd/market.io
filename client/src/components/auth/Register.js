import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register } = authContext;
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
      register(user);
    }
  };

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
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Register as</label>
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
