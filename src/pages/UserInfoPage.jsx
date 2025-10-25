import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PaymentModal from "../components/PaymentModal";

const BSCSCAN_API_KEY = import.meta.env.VITE_BSCSCAN_KEY || "";

export default function WalletPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balanceBNB, setBalanceBNB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("br_demo_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  useEffect(() => {
    if (!user?.wallet) return;
    const fetchBalance = async () => {
      setLoading(true);
      try {
        if (!BSCSCAN_API_KEY) {
          toast.error("BscScan API key missing. Set VITE_BSCSCAN_KEY in .env");
          setLoading(false);
          return;
        }
        const url = `https://api.bscscan.com/api?module=account&action=balance&address=${user.wallet}&tag=latest&apikey=${BSCSCAN_API_KEY}`;
        const res = await axios.get(url, { timeout: 10000 });
        if (res.data?.status === "1" && res.data?.result != null) {
          const wei = res.data.result; // string
          // convert using BigInt for safety
          try {
            const weiBig = BigInt(wei);
            const base = BigInt("1000000000000000000");
            const intPart = weiBig / base;
            const rem = weiBig % base;
            const frac = Number(rem) / 1e18;
            const bnb = Number(intPart) + frac;
            setBalanceBNB(bnb);
          } catch (err) {
            // fallback
            const bnb = Number(wei) / 1e18;
            setBalanceBNB(isFinite(bnb) ? bnb : 0);
          }
        } else {
          toast.error("Unable to fetch balance: " + (res.data?.message || "bad response"));
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch balance — check API key/network");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user]);

  const openPayment = () => setModalOpen(true);
  const handleProceedToPayment = () => {
    setModalOpen(false);
    navigate("/payment");
  };

  if (!user) {
    return (
      <div className="app-shell">
        <div className="card">
          <p>No user info found. Please enter your info first.</p>
          <div className="row">
            <button className="btn btn-primary" onClick={() => navigate("/userinfo")}>Enter Info</button>
            <button className="btn btn-ghost" onClick={() => navigate("/")}>Home</button>
          </div>
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
            <h1>Wallet Dashboard</h1>
            <p className="lead">Summary for {user.name}</p>
          </div>
        </div>

        <div className="box">
          <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="muted">Wallet</div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, overflowWrap: "anywhere" }}>{user.wallet}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="muted">Phone</div>
              <div style={{ fontWeight: 700 }}>{user.phone}</div>
            </div>
          </div>

          <div className="wallet-card">
            <div>
              <div className="muted">Available balance</div>
              <div className="balance">{loading ? "Checking..." : (balanceBNB != null ? `${balanceBNB.toFixed(6)} BNB` : "N/A")}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="muted">Network</div>
              <div style={{ fontWeight: 700 }}>BSC</div>
            </div>
          </div>

          <div className="actions" style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={openPayment}>Withdraw to Bank</button>
            <button className="btn btn-ghost" onClick={openPayment}>Transfer to CashApp / PayPal</button>
            <button className="btn btn-ghost" onClick={() => { localStorage.removeItem("br_demo_user"); toast("Cleared user data"); }}>Clear Data</button>
          </div>

          <div style={{ marginTop: 12 }} className="small-muted">
            Note: Withdraw / Transfer buttons open a payment modal.
          </div>
        </div>
      </div>

      {modalOpen && (
        <PaymentModal
          onClose={() => setModalOpen(false)}
          onProceed={handleProceedToPayment}
        />
      )}
    </div>
  );
                      }
