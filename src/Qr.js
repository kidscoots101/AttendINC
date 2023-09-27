import React, { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default function Qr() {

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

  const navigate = useNavigate();
  const nemail = localStorage.getItem("email");
  const email = unKKBRB(nemail);
  const [isScanned, setIsScanned] = useState(false);
  async function sendToFirebase(qr, timeNow) {
    const unKKBRBInfo = unKKBRB(qr);
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);

    const attendanceRef = await addDoc(
      collection(
        db,
        process.env.REACT_APP_firebaseRootCollection,
        parts[1],
        process.env.REACT_APP_firebaseDocumentCollection
      ),
      {
        email: email,
        timeOfPost: timeNow,
        timeOnQRCode: Number(parts[2]),
      }
    );

    setTimeout(function () {}, 15000);
  }

  const [isCameraActive, setCameraActive] = useState(true);

  function sendtoFirebaseAlert(qr) {
    const unKKBRBInfo = unKKBRB(qr);
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);

    const timeNow = Number(Date.now());
    const confirmResponse = window.confirm(
      `Press OK to submit attendance in ${parts[0]}`
    );
    if (confirmResponse) {
      setIsScanned(true);
      sendToFirebase(qr, timeNow);
      setCameraActive(false);
      navigate("/success")
    }
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
    navigate("/");
  };

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
      <text
        style={{
          fontWeight: "bold",
          color: "white",
          marginBottom: "15px",
          marginLeft: "15px",
          marginRight: "15px",
          textAlign: "center",
        }}
      >
        Logged in with: <br /> {email}
      </text>

      <text style={{ fontSize: "2vh", fontWeight: "bold", color: "white", textAlign: "center" }}>
        Scan the QR Code displayed on screen by your teacher to{" "}
        <span style={{ color: "yellow" }}>mark your attendance</span>
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
          <QrScanner
            onDecode={(result) => {
              const nolinkResult = result.replaceAll(
                "https://attend-inc-sandy.vercel.app/Qr?=",
                ""
              );
              console.log(nolinkResult);
              sendtoFirebaseAlert(nolinkResult);
            }}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          style={{ backgroundColor: "#e0242f", fontWeight: "bold" }}
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
