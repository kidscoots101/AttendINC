import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const AttendanceSystem = () => {
  const clientId =
    "635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com";
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log("Login Success", response);
    navigate("/Qr");
  };
  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
    // Treat the login as successful and proceed
    // window.location.href = "/Qr.js";
  };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

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
        onFailure={console.log("Nah not it")}
        cookiePolicy={"single_host_origin"}
      />
      {/* </GoogleOAuthProvider> */}
    </div>
  );
};

export default AttendanceSystem;
