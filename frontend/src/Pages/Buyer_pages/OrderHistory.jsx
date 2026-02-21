import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const API_BASE = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/farmer/myorders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          alert("Failed to fetch orders");
          return;
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <h3>Loading orders...</h3>;

  if (orders.length === 0) return <h3>No orders found</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.order_id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          <h4>Order ID: {order.order_id}</h4>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>

          <hr />

          {order.items.map((item, index) => (
            <div key={index}>
              {item.product} — {item.quantity} × ₹{item.price}
            </div>
          ))}

          <hr />
          <strong>Total: ₹ {order.total_price}</strong>

          <br />
          <button
            style={{ marginTop: 10 }}
            onClick={() =>
              navigate(`/buyerhome/receipt/${order.order_id}`)
            }
          >
            View Receipt
          </button>
        </div>
      ))}
    </div>
  );
}