import React from "react";
import moment from "moment";
import numeral from "numeral";

const OrderItem = ({ order }) => {
  const { _id, amount } = order;

  const bill = numeral(order.bill).format("$0,0.00");
  const createdAt = moment(order.createdAt).format("Do MMM YYYY (hh:mm a)");
  const updatedAt = moment(order.updatedAt).format("Do MMM YYYY (hh:mm a)");
  const type =
    order.type.substr(0, 1).toUpperCase() + order.type.substr(1).toLowerCase();

  return (
    <li className="tile order">
      <div className="order-id">
        <p className="text-lg">ID: {_id}</p>
      </div>

      <div className="info">
        <div className="sub-info">
          <p>Type</p>
          <p>{type}</p>
        </div>

        <div className="sub-info">
          <p>Amount</p>
          <p>{amount}</p>
        </div>

        <div className="sub-info">
          <p>Payment</p>
          <p>{bill}</p>
        </div>

        <div className="sub-info">
          <p>Ordered date</p>
          <p>{createdAt}</p>
        </div>
        <div className="sub-info">
          <p>Delivery date</p>
          <p>{createdAt === updatedAt ? "N/A" : updatedAt}</p>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
