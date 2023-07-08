import React, { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import email from "./Login";

export default function Qr() {
  const [qrCodeData, setQRCodeData] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");
  let timer;
  useEffect(() => {
    generateQRCode();

    return () => clearTimeout(timer);
  }, []);

  const generateQRCode = () => {
    const studentInfo = getStudentInfo();
    setQRCodeData(studentInfo);
    startTimer();
  };

  const startTimer = () => {
    setTimeout(() => {
      generateQRCode();
    }, 2000);
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
  }

  function encryptText(text) {
    var knitted = knitString(knitString(text));
    var base64Text = base64Encode(knitted);
    var rot13Text = rot13(base64Text);
    var finalText = base64Encode(rot13Text);
    return finalText;
  }

  const getStudentInfo = () => {
    var currentTime = Math.floor(Date.now() / 1000);
    var currentTimetoString = currentTime.toString();
    var finaloutput = encryptText(email + " " + currentTimetoString);
    console.log(email);
    const studentInfo = `${finaloutput}`;

    return studentInfo;
  };
  function decryptText(text) {
    function unKnitString(str) {
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

    function unrot13(text) {
      return text.replace(/[a-zA-Z]/g, function (c) {
        var charCode = c.charCodeAt(0);
        var base = charCode < 91 ? 65 : 97;
        return String.fromCharCode(((charCode - base + 13) % 26) + base);
      });
    }

    function base64Decode(text) {
      return atob(text);
    }

    var base64DecodedText = base64Decode(text);
    var unrot13Text = unrot13(base64DecodedText);
    var base64DecodedText2 = base64Decode(unrot13Text);
    var unknittedText = unKnitString(unKnitString(base64DecodedText2));
    return unknittedText;
  }
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  function validateEmail(email) {
    // Email validation regex pattern
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  }
  useEffect(() => {
    if (!email || !validateEmail(email)) {
      navigate("/");
    } else {
      generateQRCode();
    }

    return () => clearTimeout(timer);
  }, [email, navigate]);
  const isSmallScreen = window.innerWidth <= 600;

  const textStyle = {
    fontWeight: "bold",
    color: "white",
    fontSize: isSmallScreen ? "18px" : "23px",
    paddingBottom: isSmallScreen ? "15px" : "30px",
    paddingLeft: isSmallScreen ? "18px" : "23px",
  };

  const highlightStyle = {
    color: "yellow",
  };
  // Retrieve the email value from local storage
  // const email = localStorage.getItem("email");

  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <text style={{ fontWeight: "bold", color: "white" }}>
        Logged in with: <br />
      </text>
      <text style={{ fontWeight: "bold", paddingBottom: 30, color: "white" }}>
        {email}
      </text>
      <text style={textStyle}>
        Scan your QR Code at an admin terminal to{" "}
        <span style={highlightStyle}>mark attendance</span>
      </text>

      {qrCodeData && (
        <QRCode
          value={qrCodeData}
          size={250}
          style={{ backgroundColor: "#000000" }}
          key={qrCodeData}
        />
      )}
    </div>
  );
}
