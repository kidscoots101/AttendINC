import React, { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import {QrScanner} from '@yudiel/react-qr-scanner';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc} from "firebase/firestore";
import { initializeApp } from "firebase/app";


export default function Qr() {
  const [qrCodeData, setQRCodeData] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const email = searchParams.get("email");
  const [data, setData] = useState('No result');
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
    }, 3500);
  };

  const getStudentInfo = () => {
    var currentTime = Math.floor(Date.now() / 1000);
    var currentTimetoString = currentTime.toString();
    var finaloutput = encryptText(email + " " + currentTimetoString);
    // console.log("Nah lol u tried to inspect this page u ain't getting nothing.");
    const studentInfo = `${finaloutput}`;

    return studentInfo;
  };

  function unknitString(str) {
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
  }; 

  const qrCodeLink = "https://www.google.com/q?=" + qrCodeData;
  // console.log(qrCodeLink)
  function derot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }
  function base64Decode(text) {
    return atob(text);
  }
  function decryptText(text) {
    var decodedText = base64Decode(text);
    var rot13Text = derot13(decodedText);
    var base64Text = base64Decode(rot13Text);
    var final = unknitString(unknitString(base64Text))
    return final;
  }

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


  function unknitString(str) {
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
  };

  function derot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
  }
  function base64Decode(text) {
    return atob(text);
  }
  function decryptText(text) {
    var decodedText = base64Decode(text);
    var rot13Text = derot13(decodedText);
    var base64Text = base64Decode(rot13Text);
    var final = unknitString(unknitString(base64Text))
    return final;
  }

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const navigate = useNavigate();
  const nemail = localStorage.getItem("email");
  const email = decryptText(nemail);
  const [isScanned, setIsScanned] = useState(false);
  async function sendToFirebase(qrResult) {
    const decrypted_text = decryptText(qrResult)
    const parts = decrypted_text.split('---');
    console.log(parts[0])


    const attendanceRef = await addDoc(collection(db, 'attendance', parts[1], "attendances"), {
      email: email,
      timeOfPost: Number(Date.now()),
      timeOnQRCode: Number(parts[2])
    });
    
    
    setTimeout(function() {
    }, 15000);
  };

  const [isCameraActive, setCameraActive] = useState(true); // State variable to track camera activity
  
  function sendtoFirebaseAlert(qrResult) {
    setIsScanned(true); // Set the isScanned state to true after scanning
    const decrypted_text = decryptText(qrResult)
    const parts = decrypted_text.split('---');

    setCameraActive(false); 

    const confirmResponse = window.confirm(`You are taking attendance for the ${parts[0]}`);
    if (confirmResponse) {
      setIsScanned(true);
      sendToFirebase(qrResult)
      console.log("Sent to firebase!")
      // setCameraActive(true)
    }
  }

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
    textAlign: 'center',
  };

  const highlightStyle = {
    color: "yellow",
  };


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
      {isCameraActive ? (
        <text style={textStyle}>
          Scan the QR Code on the screen to{" "}
          <span style={highlightStyle}>mark your attendance</span>
          <QrScanner
            onDecode={(result) => [setData(email), sendtoFirebaseAlert(result)]}
            onError={(error) => console.log(error?.message)}
          />
          <p>{data}</p>
        </text>
      ) : (
        <text
          style={{
            fontWeight: "bold",
            color: "yellow",
            fontSize: isSmallScreen ? "18px" : "23px",
            paddingBottom: isSmallScreen ? "15px" : "30px",
            paddingLeft: isSmallScreen ? "18px" : "23px",
            textAlign: "center",
          }}
        >
          Attendance submitted! Please check the QR Code terminal to ensure that
          it was successful taken.

          Thank you for keeping SST Inc. #INCredible
        </text>
      )}
    </div>
  );
    }
