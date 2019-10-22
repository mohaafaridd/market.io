import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, client, loadClient, logout, loading } = authContext;

  useEffect(() => {
    loadClient();
  }, []);

  const onLogout = e => {
    logout();
  };

  if (loading) {
    return <h4>Loading</h4>;
  }

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
        <li>
          <Link to='/cart'>Cart</Link>
        </li>
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

  return (
    <nav>
      <span>Market</span>

      <ul>{isAuthenticated ? clientLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
