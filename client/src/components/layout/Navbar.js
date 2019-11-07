import React, { Fragment, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const text = useRef('');
  const { isAuthenticated, client, logout } = authContext;
  let history = useHistory();

  const onLogout = e => {
    logout();
  };

  const guestLinks = (
    <Fragment>
      <li className='btn btn-accent mr-2'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='btn btn-accent'>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const clientLinks = (
    <Fragment>
      {client && client.role === 'User' ? (
        <Fragment>
          <li className='btn btn-accent'>
            <Link to='/user/cart'>Cart</Link>
          </li>
          <li className='btn btn-accent mx-2'>
            <Link to='/user/orders'>Orders</Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <Link to='/store'>Dashboard</Link>
        </li>
      )}
      <li className='btn btn-outlined btn-accent-border'>
        <a href='#!' onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const onSubmit = e => {
    e.preventDefault();
    if (text.current.value.trim() !== '') {
      history.push(`/search?name=${text.current.value}`);
    }
  };

  return (
    <nav className='nav'>
      <span className='title secondary-text'>Market</span>

      <form className='search-box' onSubmit={onSubmit}>
        <input
          className='input flex-1'
          type='text'
          placeholder='Search products...'
          ref={text}
        />
        <button className='btn btn-accent ml-2'>
          <i class='fas fa-search'></i> Search
        </button>
      </form>

      <ul>{isAuthenticated ? clientLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
