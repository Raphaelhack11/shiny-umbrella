import React from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="card" style={{ textAlign: "center" }}>
        <div className="header" style={{ justifyContent: "center" }}>
          <div className="logo">BR</div>
          <div>
            <h1>Payment Received (Demo)</h1>
            <p className="lead">Thanks — we will confirm your demo payment shortly</p>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <p className="muted">This is a class-demo confirmation. In a real system we would verify the transaction and unlock the account after confirmation.</p>
        </div>

        <div style={{ marginTop: 18 }} className="row" >
          <button className="btn btn-primary" onClick={() => navigate("/wallet")}>Back to Wallet</button>
          <button className="btn btn-ghost" onClick={() => navigate("/")}>Home</button>
        </div>
      </div>
    </div>
  );
}
