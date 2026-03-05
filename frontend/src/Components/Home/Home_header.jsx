import "./Home_header.css";
import Logo from "../../assets/logo-3.jpeg";
// import Logo from "../../assets/logoName.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcAbout } from "react-icons/fc";
import { FaStar } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdContactSupport } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";

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
            <Link to="/" onClick={() => setMenuOpen(false)}><IoHome /> Home</Link>
            <Link to="/product" onClick={() => setMenuOpen(false)}><AiFillProduct /> Product</Link>
            <Link to="/features" onClick={() => setMenuOpen(false)}><FaStar /> Features</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}><FcAbout /> About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}><MdContactSupport /> Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}