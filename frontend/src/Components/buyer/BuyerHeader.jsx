import "../farmer/FarmerHeader.css";
import logo from "../../assets/logoName.webp";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./BuyerHeader.css"
export default function BuyerHeader({ islogin, setIslogin }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIslogin(false);
    navigate("/login");
  };

  return (
    <header className="header">
     <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>


      <div className="navbar">
      <div
        className="baricon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      <nav className={ menuOpen ? "active" : ""}>
        <Link to="/buyerhome" onClick={() => setMenuOpen(false)}>
          <i class="fa-solid fa-house"></i>
          Home
        </Link>

        <Link to="/buyerhome/Cart" onClick={() => setMenuOpen(false)}>
        <i class="fa-solid fa-cart-arrow-down"></i>
          Cart
        </Link>

        <Link to="/buyerhome/orderhistory" onClick={() => setMenuOpen(false)}>
          <i class="fa-solid fa-bag-shopping"></i>
          Order
        </Link>

         <Link to="/buyerhome/profile" onClick={() => setMenuOpen(false)}>
         <i class="fa-solid fa-user"></i>
          Profile
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      </div>
      </div>
    </header>
    
  );
}
