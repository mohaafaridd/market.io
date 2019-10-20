import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      console.log('Please enter all fields');
    } else {
      login(user);
    }
  };
  return (
    <section>
      <h3>Login</h3>

      <form onSubmit={onSubmit}>
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

        <input type='submit' value='Login' />
      </form>
    </section>
  );
};

export default Login;
