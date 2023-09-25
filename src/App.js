import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendanceSystem from "./Login";
import Qr from "./Qr";
import Modal from 'react-modal';
import './App.css'
import Policy from "./Policy";
import ConfigPage from "./Config";

export default function App() {
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  useEffect(() => {
    const hasSeenPolicy = localStorage.getItem('hasSeenPolicy');

    if (!hasSeenPolicy) {
      setShowFullPolicy(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hasSeenPolicy', 'true');
    setShowFullPolicy(false);
  };

  return (
    <Router>
     <Modal
        isOpen={showFullPolicy}
        onRequestClose={setShowFullPolicy}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>UPDATE!</h2>
          <p>Our privacy policy has been updated! Please read our <a href="/privacy-policy">Privacy Policy</a>.</p>
          <button onClick={handleAccept}>Got it!</button>
        </div>
      </Modal>
      <Routes>
        <Route path="/" element={<AttendanceSystem />} />
        <Route path="/Qr" element={<Qr />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="*" element={<AttendanceSystem />} />
      </Routes>
    </Router>
  );
}
