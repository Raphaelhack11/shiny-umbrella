import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  // Demo-only placeholder (do NOT use in production)
  const demoBTCAddress = "bc1qFAKEDEMOADDRESSEXAMPLE0000000000000";

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>Payment — Demo</h1>
            <p className="lead">Pay the required fee to unlock account (Demo)</p>
          </div>
        </div>

        <div className="box">
          <p className="muted">This is a simulated deposit page for demonstration only. No real funds should be sent.</p>

          <div style={{ marginTop: 16 }}>
            <div className="muted">Amount to pay</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>$100.00</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className="muted">Deposit method (example)</div>
            <div style={{ marginTop: 8, padding: 12, borderRadius: 10, border: "1px solid rgba(21,75,156,0.06)", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Bitcoin (example placeholder)</div>
                  <div className="small-muted">Send the exact amount to the address below (demo only)</div>
                </div>
                <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025" alt="BTC" style={{ width: 48, height: 48 }} />
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="muted">Wallet address</div>
                <div style={{ fontFamily: "monospace", marginTop: 6 }}>{demoBTCAddress}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <label>Enter payment reference (demo)</label>
            <input placeholder="e.g. TXN-12345" />
          </div>

          <div className="row" style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={() => navigate("/confirmation")} >I've Sent Payment (Demo)</button>
            <button className="btn btn-ghost" onClick={() => navigate("/wallet")}>Cancel</button>
          </div>
        </div>

        <div className="footer-links">
          <div className="small-muted">Demo only — no money will be sent.</div>
          <div>
            <button className="btn btn-ghost" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
