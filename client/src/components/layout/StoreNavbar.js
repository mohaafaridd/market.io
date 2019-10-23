import React from 'react';
import { Link } from 'react-router-dom';

const StoreNavbar = () => {
  return (
    <ul>
      <li>
        <Link to='/store'>Statistics</Link>
      </li>
      <li>
        <Link to='/store/products'>Products</Link>
      </li>
      <li>
        <Link to='/store/bundles'>Bundles</Link>
      </li>
    </ul>
  );
};

export default StoreNavbar;
