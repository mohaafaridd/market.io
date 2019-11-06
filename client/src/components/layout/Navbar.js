import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { searchProductByName } = useContext(ProductContext);
  const text = useRef('');
  const { isAuthenticated, client, logout } = authContext;
  let history = useHistory();

  const onLogout = e => {
    logout();
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const clientLinks = (
    <Fragment>
      <li>Hello {client && client.name}</li>
      {client && client.role === 'User' ? (
        <Fragment>
          <li>
            <Link to='/user/cart'>Cart</Link>
          </li>
          <li>
            <Link to='/user/orders'>Orders</Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <Link to='/store'>Dashboard</Link>
        </li>
      )}
      <li>
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
    <nav>
      <span>Market</span>

      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Search products...' ref={text} />
        <button>Search</button>
      </form>

      <ul>{isAuthenticated ? clientLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
