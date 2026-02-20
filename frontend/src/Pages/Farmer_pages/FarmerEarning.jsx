import { useEffect, useState } from "react";

export default function FarmerEarnings() {
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    const access = localStorage.getItem("access");

    const response = await fetch(
      "http://127.0.0.1:8000/api/farmer/earnings/",
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await response.json();
    setEarnings(data);
  };

  return (
    <div className="earnings-container">
      <h2>Earnings Summary</h2>

      {earnings && (
        <div className="earnings-card">
          <h3>Total Orders: {earnings.total_orders}</h3>
          <h3>Total Earnings: ₹ {earnings.total_earnings}</h3>
        </div>
      )}
    </div>
  );
}
