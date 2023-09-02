import React from "react";
import { useLocation } from "react-router-dom";

function ConfigPage() {
  const location = useLocation();

  const configParam = new URLSearchParams(location.search);

  const openMacApp = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      window.location.href = 'attendinc://'; 
    } else {
      window.open('attendinc://' + "config?" + configParam);
    }
  };

  return (
    <div>
      <h2>Config Details</h2>
      <p>Config: {configParam}</p>
      <button onClick={openMacApp}>Open Mac App</button>
    </div>
  );
}

export default ConfigPage;
