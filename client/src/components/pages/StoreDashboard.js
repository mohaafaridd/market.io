import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import StoreNavbar from '../layout/StoreNavbar';

import Statistics from '../store/Statistics';
import AddProduct from '../store/AddProduct';
const Dashboard = ({ match }) => {
  return (
    <Fragment>
      <StoreNavbar />
      <Route path={`${match.url}/`} exact component={Statistics} />
      <Route path={`${match.url}/add-product`} exact component={AddProduct} />
    </Fragment>
  );
};

export default Dashboard;
