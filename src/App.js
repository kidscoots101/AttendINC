import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { initializeApp } from "firebase/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@harisenin/react-google-login";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { gapi } from "gapi-script";

const AttendanceSystem = () => {
  const clientId =
    "635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com";

  const responseGoogle = (response) => {
    window.location.href = "/Qr.js";
    console.log("Login Success");
  };
  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
    // Treat the login as successful and proceed
    // window.location.href = "/Qr.js";
  };
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  return (
    <div
      className="qr"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <GoogleOAuthProvider clientId="635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com"> */}
      <GoogleLogin
        clientId="635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={handleLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
      {/* </GoogleOAuthProvider> */}
    </div>
  );
};

export default AttendanceSystem;
