import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import StoreNavbar from '../layout/StoreNavbar';

import Statistics from '../store/Statistics';
import ProductsTab from '../store/products-tab/ProductsTab';
const Dashboard = ({ match }) => {
  return (
    <Fragment>
      <StoreNavbar />
      <Route path={`${match.url}/`} exact component={Statistics} />
      <Route path={`${match.url}/products`} exact component={ProductsTab} />
    </Fragment>
  );
};

export default Dashboard;
