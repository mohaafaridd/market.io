import React from 'react';
import { NavLink } from 'react-router-dom';

const StoreNavbar = () => {
  return (
    <ul className='side-nav shadow'>
      <li>
        <NavLink
          className='side-nav-item'
          exact
          activeClassName='active'
          to='/store'
        >
          Statistics
        </NavLink>
      </li>
      <li>
        <NavLink
          className='side-nav-item'
          exact
          activeClassName='active'
          to='/store/products'
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className='side-nav-item'
          exact
          activeClassName='active'
          to='/store/bundles'
        >
          Bundles
        </NavLink>
      </li>
    </ul>
  );
};

export default StoreNavbar;
