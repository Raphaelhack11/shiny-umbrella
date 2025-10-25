import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallet: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/wallet");
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>User Information</h1>
            <p className="lead">Enter your details to access your wallet</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <label>BSC Wallet Address</label>
            <input
              name="wallet"
              placeholder="0x..."
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
