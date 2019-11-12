import React, { Fragment, useContext } from "react";
import { Route, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import Cart from "../cart/Cart";
import Orders from "../order/Orders";

const UserDashboard = ({ match }) => {
  const { client, loading } = useContext(AuthContext);
  let history = useHistory();

  if (loading) {
    return <h4>Loading Dashboard...</h4>;
  } else if (!client || client.role !== "User") {
    history.push("/");
  }

  return (
    <section className="user-dashboard">
      <div className="body">
        <Route path={`${match.url}/cart`} exact component={Cart} />
        <Route path={`${match.url}/orders`} exact component={Orders} />
      </div>
    </section>
  );
};

export default UserDashboard;
