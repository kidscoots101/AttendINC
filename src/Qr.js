import React, { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from '@yudiel/react-qr-scanner';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc} from "firebase/firestore";
import { initializeApp } from "firebase/app";


export default function Qr() {
  const [qrCodeData, setQRCodeData] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
    var finaloutput = KKBRB(email + " " + currentTimetoString);
    const studentInfo = `${finaloutput}`;

    return studentInfo;
  };

  function derot13(text) {
    return text.replace(/[a-zA-Z]/g, function (c) {
      var charCode = c.charCodeAt(0);
      var base = charCode < 91 ? 65 : 97;
      return String.fromCharCode(((charCode - base + 13) % 26) + base);
    });
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
    var stage1 = K(K(text))
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
  };

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
    var stage1 = unB(text);
    var stage2 = unR(stage1);
    var stage3 = unB(stage2);
    var final = unK(unK(stage3))
    return final;
  }

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const navigate = useNavigate();
  const nemail = localStorage.getItem("email");
  const email = unKKBRB(nemail);
  const [isScanned, setIsScanned] = useState(false);
  async function sendToFirebase(qr, timeNow) {
    const unKKBRBInfo = unKKBRB(qr)
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);


    const attendanceRef = await addDoc(collection(db, process.env.REACT_APP_firebaseRootCollection, parts[1], process.env.REACT_APP_firebaseDocumentCollection), {
      email: email,
      timeOfPost: timeNow,
      timeOnQRCode: Number(parts[2])
    });
    
    
    setTimeout(function() {
    }, 15000);
  };

  const [isCameraActive, setCameraActive] = useState(true);
  
  function sendtoFirebaseAlert(qr) {
    setIsScanned(true); 
    const unKKBRBInfo = unKKBRB(qr)
    const parts = unKKBRBInfo.split(process.env.REACT_APP_unKKBRBInfoSplitter);

    
    const timeNow = Number(Date.now())
    const confirmResponse = window.confirm(`Press OK to submit attendance in ${parts[0]}`);
    if (confirmResponse) {
      setIsScanned(true);
      sendToFirebase(qr, timeNow)
      setCameraActive(false); 
    }
  }


  function validateEmail(email) {
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
  const qr_location = useLocation();

  const configParam = new URLSearchParams(qr_location.search);


  useEffect(() => {
    const garbage = "" + configParam
    if (garbage != "") {
      sendtoFirebaseAlert(garbage.slice(1));
    }
  }, []);

  
  return (
    <div
      style={{
        backgroundColor: "#1D1D20",
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
          <span style={highlightStyle}>submit your attendance</span>
          <QrScanner
            onDecode={(result) => {
              const nolinkResult = result.replaceAll("https://attend-inc-sandy.vercel.app/Qr?=", ""); 
              console.log(nolinkResult)
              setData(email);
              sendtoFirebaseAlert(nolinkResult);
            }}  
          onError={(error) => console.log(error?.message)}
          />
          <p>{data}</p>
        </text>
      ) : (
        <div
        style={{textAlign: 'center'}}>
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
          it was successful recorded.
        </text>

        <text><br /><br /></text>

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
          Thank you for keeping SST Inc. #INCredible
        </text>
        </div>
      )}
    </div>
  );
    }
