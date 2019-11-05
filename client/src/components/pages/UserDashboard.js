import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Cart from '../cart/Cart';
import Orders from '../order/Orders';

const UserDashboard = ({ match }) => {
  return (
    <Fragment>
      <h3>User Dashboard</h3>
      <Route path={`${match.url}/cart`} exact component={Cart} />
      <Route path={`${match.url}/orders`} exact component={Orders} />
    </Fragment>
  );
};

export default UserDashboard;
