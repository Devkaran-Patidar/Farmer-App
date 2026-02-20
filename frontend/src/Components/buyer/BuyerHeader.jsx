import "../farmer/FarmerHeader.css";
import logo from "../../assets/logoName.webp";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function BuyerHeader({ islogin, setIslogin }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIslogin(false);
    navigate("/login");
  };

  return (
    <header className="farmer-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Navigation */}
      <div className={`nav-bar ${menuOpen ? "active" : ""}`}>
        <Link to="/buyerhome" onClick={() => setMenuOpen(false)}>
          home
        </Link>

        <Link to="/buyerhome/Cart" onClick={() => setMenuOpen(false)}>
          Cart
        </Link>

        <Link to="/buyerhome/order" onClick={() => setMenuOpen(false)}>
          Order
        </Link>

         <Link to="/buyerhome/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
