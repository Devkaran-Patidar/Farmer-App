import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Register.css";

export default function Register({ islogin, setIslogin }) {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("role", e.target.role.value);
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("avatar", e.target.avatar.files[0]); // renamed to avatar
    formData.append("phone_number", e.target.number.value);
    formData.append("password", e.target.password.value);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/register/", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(result)

      if (!res.ok) {
  let errorMessage = "";

  for (let key in result) {
    errorMessage += `${key}: ${result[key][0]}\n`;
  }

  alert(errorMessage);
  return;
}
      // After registration, automatically login to get JWT
      const loginRes = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert("Auto login failed!");
        return;
      }

      // Store JWT tokens in localStorage
      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);

      localStorage.setItem("role", loginData.user.role);
      localStorage.setItem("userId", loginData.user.id);
      localStorage.setItem("islogin", "true");
      setIslogin(true);


      const role = loginData.user.role.toLowerCase();
      if(role === "farmer")  {
        navigate("/farmerhome")
      }
      else if (role === "buyer") {
        navigate("/buyerhome");
      }
      else{
         alert("Unknown role: " + role);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="signup-section">
      <div className="sign_up">
        <h1 className="text">Register</h1>
        <form id="signup" onSubmit={handleSignup} encType="multipart/form-data">
          <select name="role" required>
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>

          <input
            type="text"
            name="username"
            placeholder="Type Your full Name"
            required
          />

          <input type="email" name="email" placeholder="Type Your Email" required />

          <input type="file" name="avatar" accept="image/*" required />

          <input
            type="tel"
            name="number"
            placeholder="Enter your Phone No."
            pattern="[0-9]{10}"
            minLength={10}
            maxLength={10}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Type Your Password"
            required
          />

          <button type="submit">Submit</button>

          <p>
            Already have an Account?{" "}
            <Link to="/login" className="text1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
