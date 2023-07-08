import React, { useEffect, useState, useContext } from "react";
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

  function rot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }
  function base64Encode(text) {
    return btoa(text);
  }

  function knitString(str) {
    let result = "";
    let left = 0;
    let right = str.length - 1;

    while (left <= right) {
      if (left === right) {
        result += str[left];
      } else {
        result += str[left] + str[right];
      }
      left++;
      right--;
    }

    return result;
  };

  function encryptText(text) {
    var knitted = knitString(knitString(text))
    var base64Text = base64Encode(knitted);
    var rot13Text = rot13(base64Text);
    var finalText = base64Encode(rot13Text);
    return finalText;
  }
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
  // const { setEmail } = useContext(EmailContext);

  const responseGoogle = async (response) => {
    console.log("Login Success", response);

    var currentTime = Math.floor(Date.now() / 1000);
    const email = response.profileObj.email;
    setEmail(email);
    const nemail = encryptText(email);
    localStorage.setItem("email", nemail);

    navigate(`/Qr`);
    // setEmail(response.profileObj.email);
    setIsLoggedIn(true);
    try {
      await gapi.auth2.getAuthInstance().signIn();
      console.log(response.profileObj.email + currentTime);
    } catch (error) {
      console.error("Error signing in:", error);
    }
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

      <h1 style={{ color: "white", fontFamily: "'Titillium Web', sans-serif" }}>
        AttendINC
      </h1>
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
          backgroundcolor: "blue",
        }}
      />
      {/* <button className="button">
        <text style={{ color: "#E1E1E4" }}>Tap this button</text>
      </button> */}
      {/* </GoogleOAuthProvider> */}
      <text
        style={{
          color: "white",
          fontSize: 14,
          paddingTop: 20,
          fontFamily: "'Titillium Web', sans-serif",
        }}
      >
        Created with ❤️ by 2023 ExCo members
      </text>
    </div>
  );
};

export default AttendanceSystem;
