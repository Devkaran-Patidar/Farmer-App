import "./FarmerHeader.css";
import logo from "../../assets/logoName.webp";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

export default function FarmerHeader({ islogin, setIslogin }) {
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
      

      <div className="navbar" >
        <div className="baricon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      

      <nav className={menuOpen ? "active" : ""}>
        {/* <Link to="/farmerhome" onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link> */}

        <Link to="/farmerhome" onClick={() => setMenuOpen(false)}>
          <AiFillProduct />
          My Products
        </Link>

        <Link to="/farmerhome/farmerorders" onClick={() => setMenuOpen(false)}>
          <FaShoppingBag />
          Orders
        </Link>
        
        <Link to="/farmerhome/farmerearning" onClick={() => setMenuOpen(false)}>
        <GiTakeMyMoney />
          Earning
        </Link>

         <Link to="/farmerhome/profile" onClick={() => setMenuOpen(false)}>
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
