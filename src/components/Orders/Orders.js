import React from 'react';
import './Orders.css';
import Order from '../Order/Order.js';

const Orders = ({ orders }) => {
  const orderEls = orders.map(order => {
    return (
      <Order
        key={ order.id }
        id={ order.id }
        name={ order.name }
        ingredients={ order.ingredients }
      />
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;
