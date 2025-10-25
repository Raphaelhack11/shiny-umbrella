import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>BlueRiver Bank</h1>
            <p className="lead">Your trusted partner in BSC digital banking</p>
          </div>
        </div>

        <div className="box">
          <p>
            Welcome to <strong>BlueRiver Bank</strong>, the secure and modern way
            to manage your BNB assets. Our platform lets you check your wallet
            balance, track transactions, and manage your digital banking
            seamlessly.
          </p>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/userinfo")}
            >
              Get Started
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/wallet")}
            >
              View Wallet
            </button>
          </div>
        </div>

        <div className="wallet-card">
          <div>
            <h3>Reliable, Transparent, Global</h3>
            <p className="muted">
              Built on Binance Smart Chain for faster, safer transactions.
            </p>
          </div>
          <img
            src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=025"
            alt="BNB"
            style={{ width: 64, height: 64 }}
          />
        </div>
      </div>
    </div>
  );
}
