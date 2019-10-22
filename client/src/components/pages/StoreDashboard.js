import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import StoreNavbar from '../layout/StoreNavbar';

import Statistics from '../store/Statistics';
import AddProduct from '../store/AddProduct';
import Products from '../store/Products';
const Dashboard = ({ match }) => {
  return (
    <Fragment>
      <StoreNavbar />
      <Route path={`${match.url}/`} exact component={Statistics} />
      <Route path={`${match.url}/add-product`} exact component={AddProduct} />
      <Route path={`${match.url}/products`} exact component={Products} />
    </Fragment>
  );
};

export default Dashboard;
