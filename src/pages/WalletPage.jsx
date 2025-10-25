import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BSCSCAN_API_KEY = "AB1MZYXX63MIGJWKS3PBY3WKJ3GFTQA85U"; // 🔁 Replace with your own

export default function WalletPage() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const getBalance = async () => {
    if (!user?.wallet) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.bscscan.com/api?module=account&action=balance&address=${user.wallet}&apikey=${BSCSCAN_API_KEY}`
      );
      const wei = res.data.result;
      const bnb = wei / 1e18;
      setBalance(bnb.toFixed(4));
    } catch (error) {
      alert("Error fetching balance");
    }
    setLoading(false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  if (!user) {
    return (
      <div className="app-shell">
        <div className="card">
          <p>No user found. Please fill in your information again.</p>
          <button className="btn btn-primary" onClick={() => navigate("/userinfo")}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>Wallet Overview</h1>
            <p className="lead">{user.name}'s BSC Account</p>
          </div>
        </div>

        <div className="box">
          <p><strong>Wallet:</strong> {user.wallet}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="wallet-card">
          <div>
            <p className="muted">BNB Balance</p>
            <p className="balance">
              {loading ? "Loading..." : balance !== null ? `${balance} BNB` : "N/A"}
            </p>
          </div>
          <img
            src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=025"
            alt="BNB"
            style={{ width: 64, height: 64 }}
          />
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={getBalance}>
            Refresh
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
