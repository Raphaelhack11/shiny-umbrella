import React from "react";

export default function PaymentModal({ onClose, onProceed }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Payment Required</h3>
          <button onClick={onClose} className="btn btn-ghost">
            Close
          </button>
        </div>

        {/* Message */}
        <p style={{ marginTop: 8 }}>
          This action requires an account unlock payment to proceed.
        </p>

        {/* Buttons */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button onClick={onProceed} className="btn btn-primary">
            Proceed to Payment
          </button>
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
        }
