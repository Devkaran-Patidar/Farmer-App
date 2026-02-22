import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Reciept.css"
export default function Receipt() {
  const API_BASE = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const receiptRef = useRef();

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // =======================
  // FETCH ORDER
  // =======================
  useEffect(() => {
    if (!orderId) {
      alert("No order found");
      navigate("/buyerhome");
      return;
    }

    fetch(`${API_BASE}/api/farmer/orders/${orderId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch order");
      });
  }, [orderId, token, navigate]);

  // =======================
  // FETCH PROFILE
  // =======================
  useEffect(() => {
    if (!userId || !token) {
      setLoadingProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/user/profile/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Profile fetch failed:", res.status);
          setLoadingProfile(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
        setLoadingProfile(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  // =======================
  // PRINT FUNCTION
  // =======================
  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const newWindow = window.open("", "_blank");

    newWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial; padding: 20px; }
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

  // =======================
  // LOADING STATES
  // =======================
  if (!order) return <h3>Loading receipt...</h3>;

  return (
    <div style={{ padding: 20 }} className="recipt-section">
      <div ref={receiptRef} className="recipt">
        <h2>🧾 Receipt</h2>

        <div className="recipt-content">
          
         {!loadingProfile && profile && (
          <>
            <hr />
            <p><strong>Name:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone_number}</p>
          </>
        )}
        <p>
          <strong>Receipt No:</strong> {order.order_id}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>

        <hr />

        {order.items.map((item, index) => (
          <div className="item" key={index}>
            <p>
              {item.product} — {item.quantity} × ₹{item.price} = ₹
              {item.quantity * item.price}
            </p>
          </div>
        ))}

        <hr />
        <h3>Total: <span className="tottal"> ₹{order.total_price}</span></h3>

        {/* PROFILE SECTION */}
       
      </div>
       <button onClick={handlePrint} style={{ marginTop: 20 }}>
        Print Receipt
      </button>
        </div>
    </div>
  );
}