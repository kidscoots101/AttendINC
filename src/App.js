import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendanceSystem from "./Login";
import Qr from "./Qr";

export default function App() {
  return (
    <Router>
      {/* <h1>App</h1> */}
      <Routes>
        <Route path="/" element={<AttendanceSystem />} />
        <Route path="/Qr" element={<Qr />} />
      </Routes>
    </Router>
  );
}
