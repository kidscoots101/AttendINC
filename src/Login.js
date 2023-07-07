import React, { useEffect, useState } from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { initializeApp } from "firebase/app";
import QRCode from "react-qr-code";

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";

gapi.auth2.getAuthInstance().signIn();

const AttendanceSystem = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const clientId =
    "635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com";
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //   const handleLoginFailure = (error) => {
  //     console.log("Login failed:", error);
  //     // Treat the login as successful and proceed
  //     // window.location.href = "/Qr.js";
  //   };
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);
  const failedLoggedIn = () => {
    setIsLoggedIn(false);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyDSaQQGTab4XkyTDcVxA4s07m3N8KlYD7k",
    authDomain: "https://incterminal-88156.web.app/",
    projectId: "incterminal-88156",
    storageBucket: "incterminal-88156.appspot.com",
    messagingSenderId: "635818492905",
    appId: "1:635818492905:web:8f321bbe5bef7800078178",
    measurementId: "G-0VY14L4ZM9",
  };
  const [email, setEmail] = useState("");
  const responseGoogle = (response) => {
    console.log("Login Success", response);
    setEmail(response.profileObj.email);

    navigate(
      `/Qr?email=${response.profileObj.email}`
    );
    console.log(response.profileObj.email);
    // setIsLoggedIn(true);
  };
  return (
    <div
      className="qr"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      {/* <GoogleOAuthProvider clientId="635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com"> */}

      <h1 style={{ color: "white" }}>AttendINC</h1>
      <text
        style={{
          fontFamily: "'Titillium Web', sans-serif",
          color: "white",
          fontWeight: "600",
          fontSize: 15,
          marginBottom: 25,
          paddingRight: 20,
          paddingLeft: 20,
        }}
      >
        Please log in using your SST School email for attendance taking.
      </text>
      <GoogleLogin
        clientId="635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={failedLoggedIn}
        cookiePolicy={"single_host_origin"}
        style={{ 
          backgroundcolor:"blue" 
        }}
      />
      {/* <button className="button">
        <text style={{ color: "#E1E1E4" }}>Tap this button</text>
      </button> */}
      {/* </GoogleOAuthProvider> */}
      <text style={{ color: "white", fontSize: 14, paddingTop: 20 }}>
        Created with ❤️ by 2023 ExCo members
      </text>
    </div>
  );
};


export default AttendanceSystem;
