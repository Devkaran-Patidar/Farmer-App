import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Receipt() {
  const API_BASE = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  // const location = useLocation();
  const token = localStorage.getItem("access_token");
  const receiptRef = useRef();

  const [order, setOrder] = useState(null);

  // const order_id = location.state?.order_id; // passed after purchase

  const { orderId } = useParams();
  useEffect(() => {
    if (!orderId) {
      alert("No order found");
      navigate("/buyerhome");
      return;
    }

    fetch(`${API_BASE}/api/farmer/orders/${orderId}/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
       .then(res => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then(data => {
        console.log(data)
        setOrder(data)
      })
      .catch(err => {
        console.error(err);
        alert("Failed to fetch order");
      });
  }, [orderId, token, navigate]);


  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            .item { margin-bottom: 10px; }
            hr { margin: 10px 0; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  if (!order) return <h3>Loading receipt...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <div ref={receiptRef}>
        <h2>🧾 Receipt</h2>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <hr />
        {order.items.map((item, index) => (
          <div className="item" key={index}>
            <p>
              {item.product} — {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
            </p>
          </div>
        ))}
        <hr />
        <h3>Total: ₹ {order.total_price}</h3>
      </div>

      <button onClick={handlePrint} style={{ marginTop: 20 }}>
        Print Receipt
      </button>
    </div>
  );
}