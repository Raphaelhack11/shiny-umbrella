import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LandingPage() {
  const [pid, setPid] = useState("");
  const navigate = useNavigate();

  const verify = () => {
    if (!pid.trim()) {
      toast.error("Please enter Personnel ID");
      return;
    }
    if (pid.trim() === "11111A0sj") {
      toast.success("Welcome, James Richard!");
      setTimeout(() => navigate("/userinfo"), 800);
    } else {
      toast.error("Invalid Personnel ID");
    }
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <div className="logo">BR</div>
          <div>
            <h1>BlueRiver Bank — Personnel Verify</h1>
            <p className="lead">Enter your personnel ID to continue</p>
          </div>
        </div>

        <div className="box">
          <div className="input-row">
            <label>Personnel ID</label>
            <input
              value={pid}
              onChange={(e) => setPid(e.target.value)}
              placeholder="e.g. 11111A0sj"
            />
          </div>

          <div className="row">
            <button className="btn btn-primary" onClick={verify}>
              Verify
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setPid("11111A0sj");
                toast("Personnel ID inserted");
              }}
            >
              Fill Personnel ID
            </button>
          </div>

          <p className="small-muted" style={{ marginTop: 12 }}>
            Demo note: use <strong>11111A0sj</strong> for the class demo.
          </p>
        </div>
      </div>
    </div>
  );
                }
