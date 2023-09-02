import React from "react";
import { useLocation } from "react-router-dom";

function ConfigPage() {
  // Get the current URL location
  const location = useLocation();

  // Extract the config parameter from the query string
  const configParam = new URLSearchParams(location.search).get("config");

  const openMacApp = () => {
    // Check if the browser supports custom protocol handling
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      // Safari doesn't support custom protocol handling directly
      // You may need to instruct users to manually open the app
      window.location.href = 'attendinc://'; // Replace with your custom scheme
    } else {
      // For other browsers, try to open the custom URL
      window.open('attendinc://' + "config?=" + configParam);
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
