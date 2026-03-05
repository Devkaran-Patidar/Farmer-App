import "../farmer/FarmerHeader.css";
import logo from "../../assets/logoName.webp";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./BuyerHeader.css"

import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

export default function BuyerHeader({ islogin, setIslogin,setCartCount,cartCount }) {
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
          {/* <i className="fa-solid fa-house"></i> */}
          <AiOutlineHome />
          Home
        </Link>

        <Link to="/buyerhome/Cart" onClick={() => setMenuOpen(false)}>
        {/* <i className="fa-solid fa-cart-arrow-down"></i> */}
          <span className="Cartcountte">{cartCount}</span>
          <BsCart3 />
          Cart
        </Link>

        <Link to="/buyerhome/orderhistory" onClick={() => setMenuOpen(false)}>
          {/* <i className="fa-solid fa-bag-shopping"></i> */}
       <FiShoppingBag />
          Order
        </Link>

         <Link to="/buyerhome/profile" onClick={() => setMenuOpen(false)}>
         {/* <i className="fa-solid fa-user"></i> */}
         <CgProfile />
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
