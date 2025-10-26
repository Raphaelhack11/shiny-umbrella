import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import UserInfoPage from "./pages/UserInfoPage";
import WalletPage from "./pages/WalletPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

export default function App() {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    wallet: "",
    balance: null,
  });

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage setUserData={setUserData} />} />
        <Route path="/userinfo" element={<UserInfoPage setUserData={setUserData} />} />
        <Route path="/wallet" element={<WalletPage userData={userData} />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}
