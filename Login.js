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
  const clientId = process.env.REACT_APP_clientID;
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //   const handleLoginFailure = (error) => {
  //     console.log("Login failed:", error);
  //     // Treat the login as successful and proceed
  //     // window.location.href = "/Qr.js";
  //   };
  useEffect(() => {
    if (
      localStorage.getItem("email") != null ||
      localStorage.getItem("isLoggedIn") != null
    ) {
      navigate("/Qr");
    }

    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const failedLoggedIn = () => {
    setIsLoggedIn(false);
  };

  function R(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }
  function B(text) {
    return btoa(text);
  }

  function K(str) {
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

  function KKBRB(text) {
    var stage1 = K(K(text))
    var stage2 = B(stage1);
    var stage3 = R(stage2);
    var final = B(stage3);
    return final;
  }
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };

  const [email, setEmail] = useState("");
  // const { setEmail } = useContext(EmailContext);

  const responseGoogle = async (response) => {
   // console.log("Login Success", response);

    var currentTime = Math.floor(Date.now() / 1000);
    const email = response.profileObj.email;
    setEmail(email);
    const nemail = KKBRB(email);
    localStorage.setItem("email", nemail);

    navigate(`/Qr`);
    // setEmail(response.profileObj.email);
    setIsLoggedIn(true);
    try {
      await gapi.auth2.getAuthInstance().signIn();
      // console.log(response.profileObj.email + currentTime);
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
      {}

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
          textAlign: 'center',
        }}
      >
        Please log in with your SST School email to submit your attendance.
      </text>
      <GoogleLogin
        clientId={process.env.REACT_APP_clientID}
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
        Developed with ❤️ by 2023 exco members
      </text>
    </div>
  );
};

export default AttendanceSystem;
