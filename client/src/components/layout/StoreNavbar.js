import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const StoreNavbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, client } = authContext;

  return (
    <ul>
      <li>
        <Link to='/store'>Statistics</Link>
      </li>
      <li>
        <Link to='/store/add-product'>Add Product</Link>
      </li>
      <li>
        <Link to='/store/products'>Products</Link>
      </li>
      <li>
        <Link to='/store/add-bundle'>Add Bundle</Link>
      </li>
      <li>
        <Link to='/store/bundles'>Bundles</Link>
      </li>
    </ul>
  );
};

export default StoreNavbar;
