import React from "react";
import { useLocation } from "react-router-dom";
import logo from './inc.png';

function ConfigPage() {
  const location = useLocation();

  const configParam = new URLSearchParams(location.search);

  const openMacApp = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      const confirmed = window.confirm("Are you sure you want to open the Mac App?");
      if (confirmed) {
        window.location.href = 'attendinc://' + "config?" + configParam;
      }
    } else {
      const confirmed = window.confirm("Are you sure you want to open AttendINC?");
      if (confirmed) {
        window.open('attendinc://' + "config?" + configParam);
      }
    }
  };

  return (
    <div style={{backgroundColor: '#1D1D20', minHeight: '100vh'}}>
        <link
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '20px' }}>
        <img src={logo} style={{ height: 40 }} />
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', backgroundColor: '#1D1D20' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <p style={{ fontSize: 25, fontFamily: "'Titillium Web', sans-serif", color: 'white' }}>Click Launch <strong style={{fontWeight: 'bolder'}}>AttendINC</strong> below</p>
          <button onClick={openMacApp}>Launch AttendINC</button>
          <div style={{ width: '100%', maxWidth: '800px', borderBottom: '0.5px solid #808080', marginTop: 30 }}></div>
          <p style={{ marginTop: 30, fontFamily: "'Titillium Web', sans-serif", color: 'white' }}>Don't have AttendINC installed? <a href="https://testflight.apple.com/join/EjhxNSQh" style={{fontFamily: "'Titillium Web', sans-serif", color: 'white'}} target="_blank"> Download now</a></p>
        </div>
      </div>
    </div>
  );
}

export default ConfigPage;
