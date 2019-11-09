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
      <li>
        <Link className='btn btn-accent mr-2' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='btn btn-outlined btn-accent-border' to='/login'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  const clientLinks = (
    <Fragment>
      {client && client.role === 'User' ? (
        <Fragment>
          <li>
            <Link className='btn btn-accent' to='/user/cart'>
              Cart
            </Link>
          </li>
          <li>
            <Link className='btn btn-accent mx-2' to='/user/orders'>
              Orders
            </Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <Link className='btn btn-accent mr-2' to='/store'>
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <a
          className='btn btn-outlined btn-accent-border'
          href='#!'
          onClick={onLogout}
        >
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

      <div className='search-input'>
        <form onSubmit={onSubmit}>
          <input
            className='input'
            type='text'
            placeholder='Search products...'
            ref={text}
          />
          <button className='btn btn-accent ml-2'>
            <i className='fas fa-search'></i>{' '}
            <span className='sm:hidden'>Search</span>
          </button>
        </form>
      </div>
      <ul>{isAuthenticated ? clientLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
