import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../config";

export default function Login({ islogin, setIslogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (islogin) {
      const role = localStorage.getItem("role");
      if (role === "farmer") navigate("/farmerhome");
      else if (role === "buyer") navigate("/buyerhome");
    }
  }, [islogin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${API_URL}user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Invalid credentials");
        return;
      }

      // Store JWT tokens
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("refresh_token", result.refresh);

      localStorage.setItem("islogin", "true");
      localStorage.setItem("role", result.user.role);
      localStorage.setItem("userId", result.user.id);
      setIslogin(true);

      const role = result.user.role.toLowerCase();
      if (role === "farmer") navigate("/farmerhome");
      else if (role === "buyer") navigate("/buyerhome");
      else alert("Unknown role: " + role);

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="login-section">
      <div className="login_page">
         <div className="login-form">
           <h1 className="text">Login</h1>
        <form id="login" onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Type Your Email"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type Your Password"
            required
          />
          <button type="submit">Submit</button>
           </form>
         </div>
          <span className="forgot"><Link to="/forgotpass">Forgot Password</Link></span>
          <p>
            Don't have an Account?
            <Link to="/register" className="text1">
              Sign up
            </Link>
          </p>
       
      </div>
    </section>
  );
}
