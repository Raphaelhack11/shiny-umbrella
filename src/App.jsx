import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import UserInfoPage from "./pages/UserInfoPage";
import WalletPage from "./pages/WalletPage";
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
        <Route path="/wallet" element={<WalletPage />} />
      </Routes>
    </BrowserRouter>
  );
}
