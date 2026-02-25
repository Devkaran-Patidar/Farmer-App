import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("access_token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/farmer/orders/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data);
  };
const markDelivered = async (itemId) => {
  const token = localStorage.getItem("access");

  await axios.patch(
    `http://127.0.0.1:8000/api/farmer/order-item/${itemId}/deliver/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchOrders();
};
  return (
    <div>
      <h2>Farmer Orders</h2>

      {orders.map((order, index) => (
        <div key={index} style={{border:"1px solid gray", padding:10, margin:10}}>
          <p><b>Name:</b> {order.buyer}</p>
          <p><b>Email:</b> {order.email}</p>
          <p><b>Order ID:</b> {order.order_id}</p>
          <p><b>Product Name:</b> {order.product_name}</p>
          <p><b>Quantity:</b> {order.quantity}</p>
          <p><b>Date:</b> {order.created_at}</p>
          <p><b>Ammount:</b> {order.total_ammount}</p>
          <button onClick={() => markDelivered(order.id)}>
  Mark Delivered
</button>
        </div>
      ))}
    </div>
  );
}

export default FarmerOrders;