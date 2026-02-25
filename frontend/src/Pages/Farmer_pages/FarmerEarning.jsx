import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerEarning() {
  const [earning, setEarning] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.get(
        "http://127.0.0.1:8000/api/farmer/earning/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEarning(res.data.total_earning || 0);
      setDeliveredOrders(res.data.delivered_orders || 0);
      setLoading(false);

    } catch (err) {
      setError("Failed to load earnings");
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading earnings...</h3>;
  }

  if (error) {
    return <h3 style={{ color: "red" }}>{error}</h3>;
  }

  return (
    <div style={{
      maxWidth: "500px",
      margin: "30px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2>Farmer Earnings Dashboard</h2>

      <hr />

      <p><b>Total Delivered Orders:</b> {deliveredOrders}</p>

      <p style={{ fontSize: "20px", color: "green" }}>
        <b>Total Earnings:</b> ₹ {earning}
      </p>

      <button
        onClick={fetchEarnings}
        style={{
          padding: "8px 15px",
          marginTop: "10px",
          cursor: "pointer"
        }}
      >
        Refresh
      </button>
    </div>
  );
}

export default FarmerEarning;