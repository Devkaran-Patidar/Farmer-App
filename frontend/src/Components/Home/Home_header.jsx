import "./Home_header.css";
import Logo from "../../assets/logoName.webp";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar">
          <div
            className="baricon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <nav className={menuOpen ? "active" : ""}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/product" onClick={() => setMenuOpen(false)}>Product</Link>
            <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}