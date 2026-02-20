import "./FarmerHeader.css";
import logo from "../../assets/logoName.webp";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function FarmerHeader({ islogin, setIslogin }) {
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
        {/* <Link to="/farmerhome" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link> */}

        <Link to="/farmerhome" onClick={() => setMenuOpen(false)}>
          My Products
        </Link>

        <Link to="/farmerhome/farmerorders" onClick={() => setMenuOpen(false)}>
          Orders
        </Link>
        
        <Link to="/farmerhome/farmerearning" onClick={() => setMenuOpen(false)}>
          Earning
        </Link>

         <Link to="/farmerhome/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
