import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getDoc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  AffinidiLoginButton,
  useAffinidiProfile,
} from "@affinidi/affinidi-react-auth";
import "./Qr.css";
import logo from "./inc.png";

export default function Qr() {
  const isSmallScreen = window.innerWidth <= 600;
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile();

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
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

  function unK(str) {
    let result = "";
    let index;
    let strArray = str.split("");

    if (str.length % 2 === 0) {
      index = str.length - 1;
    } else {
      index = str.length - 2;
    }

    while (index > 0) {
      strArray.push(strArray[index]);
      strArray[index] = "";

      index -= 2;
    }

    result = strArray.join("");

    return result;
  }

  function unR(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }
  function unB(text) {
    return atob(text);
  }
  function unKKBRB(text) {
    if (text != null) {
      var stage1 = unB(text);
      var stage2 = unR(stage1);
      var stage3 = unB(stage2);
      var final = unK(unK(stage3));
      return final;
    }
  }

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  console.log("hhdshburfbrbcltvbilytvbilgt5vbit5vbiy5ilvy5y5ubhut5y56y")
  const navigate = useNavigate();
  const nemail = localStorage.getItem("email");
  const email = unKKBRB(nemail);
  const [isScanned, setIsScanned] = useState(false);
  async function sendToFirebase(qr, timeNow) {
    const unKKBRBInfo = unKKBRB(qr);
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);
    console.log(parts)
    const attendanceRef = await setDoc(
      doc(
        db,
        process.env.REACT_APP_firebaseRootCollection,
        parts[1],
        process.env.REACT_APP_firebaseDocumentCollection
      ),
      {
        email: email,
        timeOfPost: timeNow,
        timeOnQRCode: Number(parts[2]),
      },
    );
    setIsScanned(true);
    setCameraActive(false);
    setTimeout(function () {}, 15000);
  }

  async function validateScanning() {
    const docRef = doc(db, process.env.REACT_APP_firebaseRootCollection,
      parts[1],
      uuid
      );
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await deleteDocdoc(db, process.env.REACT_APP_firebaseRootCollection,
        parts[1],
        uuid
        );
      return true

    } else {
      // docSnap.data() will be undefined in this case
      return false
    }
  }

  const [isCameraActive, setCameraActive] = useState(true);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [id, setID] = useState("");

  function sendtoFirebaseAlert(qr) {
    const unKKBRBInfo = unKKBRB(qr);
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);
    const timeNow = Number(Date.now());
    const confirmResponse = window.confirm(
      `Press OK to submit attendance in ${parts[0]}`,
    );
    if (confirmResponse) {
      setIsScanned(true);
      sendToFirebase(qr, timeNow);
      setCameraActive(false);
      setLocation(parts[0]);
      setTime(timeNow);
      setID(parts[1].split("-"));
    }
  }
  function padZero(number) {
    return number < 10 ? "0" + number : number;
  }
  function convertTimestampToSGT(timestamp) {
    var date = new Date(timestamp);

    date.setUTCHours(date.getUTCHours() + 8);

    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    var formattedDate = `${year}-${padZero(month)}-${padZero(day)} ${padZero(
      hours,
    )}:${padZero(minutes)}:${padZero(seconds)}`;

    return formattedDate;
  }

  function validateEmail(email) {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  }

  useEffect(() => {
    if (!email || !validateEmail(email)) {
      setCameraActive(false);
      navigate("/");
    } else {
      navigate("/Qr");

      const qrCodeParam = "" + searchParam;
      console.log(qrCodeParam);
      if (qrCodeParam.slice(1) != "") {
        const convertedEquals = qrCodeParam
          .replaceAll("%3D", "=")
          .replaceAll("%2F", "/")
          .replaceAll("%2B", "+");
        console.log(convertedEquals);
        setCameraActive(false);
        sendtoFirebaseAlert(convertedEquals.slice(1));
      }
    }
  }, [email, navigate]);

  const qr_location = useLocation();

  const searchParam = new URLSearchParams(qr_location.search);

  const logOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    setCameraActive(false);
    navigate("/");
    window.location.reload();
    handleLogout();
  };

  function ScannerArea(props) {
    const credentialsAreValid = props.credentialsAreValid;
    // const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);

    if (isScanned) {
      return (
        <div className="white-box">
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <link
              href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap"
              rel="stylesheet"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: 40, marginRight: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 23,
                  fontWeight: "bold",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Titillium Web', sans-serif",
                  }}
                >
                  # {id[0]}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <span
              style={{
                fontWeight: "500",
                fontSize: "35px",
                fontFamily: "'Titillium Web', sans-serif",
                /* Add a media query for smaller screens */
                "@media (max-width: 768px)": {
                  fontSize: "30px",
                },
              }}
            >
              {location}
            </span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "28px",
                fontFamily: "'Titillium Web', sans-serif",
              }}
            >
              {email && email.split("@")[0].replace(/_/g, " ").toUpperCase()}{" "}
              stu
            </span>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "21px",
                fontFamily: "'Titillium Web', sans-serif",
                "@media (max-width: 768px)": {
                  fontSize: "15px",
                },
              }}
            >
              {convertTimestampToSGT(time)}
            </span>
          </div>
        </div>
      );
    } else {
      if (credentialsAreValid) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <text
              style={{
                fontSize: "1.9vh",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              Scan the QR Code displayed on screen by your teacher to{" "}
              <span style={{ color: "yellow" }}>mark your attendance</span>
            </text>
            <QrScanner
              onDecode={(result) => {
                const nolinkResult = result.replaceAll(
                  "https://attend-inc-sandy.vercel.app/Qr?=",
                  "",
                );
                console.log(nolinkResult);
                sendtoFirebaseAlert(nolinkResult);
              }}
              onError={(error) => console.log(error?.message)}
            />
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#1D1D20",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <text
        style={{
          fontWeight: "bold",
          color: "white",
          marginBottom: "15px",
          marginLeft: "15px",
          marginRight: "15px",
          textAlign: "center",
          fontFamily: "'Titillium Web', sans-serif",
        }}
      >
        Logged in with: <br /> {email}
      </text>

      <div style={{ margin: "15px 15px 15px 15px" }}>
        <div
          style={{
            fontSize: "1.75vh",
            width: "75vh",
            maxWidth: "100vw",
            maxHeight: "100vw",
          }}
        >
          <ScannerArea
            credentialsAreValid={
              localStorage.getItem("email") != null &&
              localStorage.getItem("isLoggedIn") != null
            }
          />

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#e0242f",
                fontWeight: "bold",
                marginTop: 15,
              }}
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
