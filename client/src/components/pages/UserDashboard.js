import React, { Fragment, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import Cart from '../cart/Cart';
import Orders from '../order/Orders';

const UserDashboard = ({ match }) => {
  const { client, loading } = useContext(AuthContext);
  let history = useHistory();

  if (loading) {
    return <h4>Loading Dashboard...</h4>;
  } else if (!client || client.role !== 'User') {
    history.push('/');
  }

  return (
    <Fragment>
      <Route path={`${match.url}/cart`} exact component={Cart} />
      <Route path={`${match.url}/orders`} exact component={Orders} />
    </Fragment>
  );
};

export default UserDashboard;
