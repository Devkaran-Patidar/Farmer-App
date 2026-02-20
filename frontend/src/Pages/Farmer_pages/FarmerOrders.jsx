import { useEffect, useState } from "react";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const access = localStorage.getItem("access");

    const response = await fetch(
      "http://127.0.0.1:8000/api/farmer/orders/",
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await response.json();
    setOrders(data);
  };

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>₹ {order.total_price}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
