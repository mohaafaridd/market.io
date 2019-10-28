import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Cart from '../user/Cart';

const UserDashboard = ({ match }) => {
  return (
    <Fragment>
      <h3>User Dashboard</h3>
      <Route path={`${match.url}/cart`} exact component={Cart} />
    </Fragment>
  );
};

export default UserDashboard;
