import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Plan from "../pages/plan";
import Family from "../pages/family";
import Subscription from "../pages/subscription";
import Register from "../pages/register";
import VerifyPhone from "../pages/verifyPhone";
import VerifyOtp from "../pages/resendOtp";

export default function AppNavigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Plan />} />
        <Route path="/family" element={<Family />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPhone />} />
        <Route path="/Otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
}
