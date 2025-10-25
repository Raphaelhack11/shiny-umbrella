import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserInfoPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("br_demo_user");
    if (raw) {
      try {
        const p = JSON.parse(raw);
        setName(p.name || "");
        setPhone(p.phone || "");
        setWallet(p.wallet || "");
      } catch {}
    }
  }, []);

  const proceed = () => {
    if (!name.trim() || !phone.trim() || !wallet.trim()) {
      toast.error("Please complete all fields");
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
      toast.error("Enter a valid BSC wallet (0x...)");
      return;
    }
    const payload = { name: name.trim(), phone: phone.trim(), wallet: wallet.trim() };
    localStorage.setItem("br_demo_user", JSON.stringify(payload));
    toast.success("Information saved");
    setTimeout(() => navigate("/wallet"), 700);
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>User Info</h1>
            <p className="lead">Enter your name, phone, and BSC wallet address</p>
          </div>
        </div>

        <div className="box">
          <div className="input-row">
            <label>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="James Richard" />
          </div>

          <div className="input-row">
            <label>Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." />
          </div>

          <div className="input-row">
            <label>BNB Wallet Address</label>
            <input value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="0x..." />
          </div>

          <div className="row">
            <button className="btn btn-primary" onClick={proceed}>
              Proceed
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                localStorage.removeItem("br_demo_user");
                setName("");
                setPhone("");
                setWallet("");
                toast("Cleared");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div style={{ marginTop: 14 }} className="small-muted">
          Your wallet address is only used to fetch your balance for this website.
        </div>
      </div>
    </div>
  );
  }
