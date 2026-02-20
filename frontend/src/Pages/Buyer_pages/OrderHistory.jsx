import { useEffect, useState } from "react";
import { fetchOrders } from "../../api.js";
// import "./styles.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div className="orders-page">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>Order ID: {order.id}</p>
          <p>Date: {order.date}</p>
          <p>Items:</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p>Total: ${order.items.reduce((a, i) => a + i.price, 0)}</p>
        </div>
      ))}
    </div>
  );
}
