import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./inc.png";
import Qr from "./Qr";
import {
  AffinidiLoginButton,
  useAffinidiProfile,
} from "@affinidi/affinidi-react-auth";
import { useMediaQuery } from "react-responsive";

const AttendanceSystem = () => {
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile();

  async function logout() {
    //clear session cookie
    handleLogout();
    window.location.href = "/";
  }
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
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInLocalStorage === "true") {
      setIsLoggedIn(true);
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
  }

  function KKBRB(text) {
    var stage1 = K(K(text));
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

  const responseGoogle = async (response) => {
    var currentTime = Math.floor(Date.now() / 1000);
    const email = response.profileObj.email;
    setEmail(email);
    const nemail = KKBRB(email);
    localStorage.setItem("email", nemail);

    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", "true");
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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div>
      {isLoggedin ? (
        <Qr />
      ) : (
        <div
          className="qr"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1D1D20",
          }}
        >
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <img src={logo} alt="Logo" style={{ height: 40 }} />

          <h1
            style={{
              color: "white",
              fontFamily: "'Titillium Web', sans-serif",
            }}
          >
            AttendINC
          </h1>
          <text
            style={{
              color: "white",
              fontFamily: "'Titillium Web', sans-serif",
              marginTop: -20,
              marginBottom: 15,
            }}
          >
            attendance made efficient
          </text>
          <text
            style={{
              fontFamily: "'Titillium Web', sans-serif",
              color: "white",
              fontWeight: "600",
              fontSize: 15,
              marginBottom: 25,
              paddingRight: 20,
              paddingLeft: 20,
              textAlign: "center",
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
          {!isMobile && !profile && (
            <>
              <AffinidiLoginButton />
            </>
          )}

          {isLoading && <p>Loading...</p>}

          {profile && (
            <>
              <text
                style={{
                  fontFamily: "'Titillium Web', sans-serif",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 15,
                  marginTop: 25,
                  textAlign: "center",
                }}
              >
                Affinidi Auth Success!
              </text>
              <button style={{ marginRight: 10 }} onClick={logout}>
                Logout
              </button>
            </>
          )}

          {error && (
            <>
              <h2>error</h2>
              {error}
            </>
          )}

          {/* <button className="button">
        <text style={{ color: "#E1E1E4" }}>Tap this button</text>
      </button> */}
          {/* </GoogleOAuthProvider> */}
          <p
            style={{
              color: "white",
              fontSize: 14,
              paddingTop: 20,
              fontFamily: "'Titillium Web', sans-serif",
            }}
          >
            new to AttendINC? read our guide{" "}
            <a
              href="/1L74HhEO8FXXI1uYmbOUTA==ADQHJAOIDJAIXALaEB1Ldsa8"
              style={{ color: "#61dafb" }}
            >
              here
            </a>
          </p>

          <text
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "'Titillium Web', sans-serif",
            }}
          >
            developed with ❤️ by 2023 exco members
          </text>
        </div>
      )}
    </div>
  );
};

export default AttendanceSystem;
