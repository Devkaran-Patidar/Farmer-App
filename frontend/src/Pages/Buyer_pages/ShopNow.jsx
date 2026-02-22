import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const ShopNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const state = location.state;

  // 🛑 If no state, redirect to home
  if (!state || !state.items) {
    return <h3>No checkout data</h3>;
  }

  const items = state.items;
  const total = state.total;

  const handleConfirmPurchase = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/farmer/create-order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        total: total,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Order failed");
      return;
    }

    let opinion = confirm("Purchase Successful 🎉. Print Receipt?");
    if (opinion) {
      navigate(`/buyerhome/receipt/${data.order_id}/`);
    } else {
      navigate("/buyerhome");
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  return (
    <div style={{ padding: 20 }}>
      <h2>🛍 Checkout</h2>

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <h4>{item.product.name}</h4>
          <p>
            {item.quantity} × ₹{item.product.price_per_unit}
          </p>
        </div>
      ))}

      <h3>Total: ₹ {total}</h3>

      <button
        onClick={handleConfirmPurchase}
        style={{ background: "orange", color: "white", padding: 10 }}
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default ShopNow;