import React, { Fragment, useContext } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import StoreNavbar from '../layout/StoreNavbar';

import AuthContext from '../../context/auth/authContext';
import Statistics from '../store/Statistics';
import ProductsTab from '../store/products-tab/ProductsTab';
const Dashboard = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { client } = authContext;
  let history = useHistory();

  if (!client || client.role !== 'Store') {
    history.push('/');
  }

  return (
    <Fragment>
      <StoreNavbar />
      <Route path={`${match.url}/`} exact component={Statistics} />
      <Route path={`${match.url}/products`} exact component={ProductsTab} />
    </Fragment>
  );
};

export default Dashboard;
