import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { initializeApp } from "firebase/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSaQQGTab4XkyTDcVxA4s07m3N8KlYD7k",
  authDomain: "https://incterminal-88156.web.app/",
  projectId: "incterminal-88156",
  storageBucket: "incterminal-88156.appspot.com",
  messagingSenderId: "635818492905",
  appId: "1:635818492905:web:8f321bbe5bef7800078178",
  measurementId: "G-0VY14L4ZM9",
};

const provider = new GoogleAuthProvider();

//Init Firebase
const app = initializeApp(firebaseConfig);

//Init Firebase Auth
const auth = getAuth(app);
signInWithPopup(auth, provider)
  .then((result) => {
    //This gives you a GAuth Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    //Signed in user's info
    const user = result.user;
    console.log(user);
  })
  .catch((error) => {
    //Handle error
    const errorCode = error.code;
    const errorMEssage = error.message;
    //THE EMAIL THAT WE NEED
    const email = error.customData.email;
    //Auth type used
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

provider.setCustomParameters({
  login_hint: "user@s202x.ssts.edu.sg",
});

function handleDOMContentLoaded() {
  // Your code to be executed when the website is opened

  console.log("Website opened!");
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

const AttendanceSystem = () => {
  const [qrCodeData, setQRCodeData] = useState("");

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
    }, 10000);
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

  function encryptText(text) {
    var base64Text = base64Encode(text);
    var rot13Text = rot13(base64Text);
    var finalBase64Text = base64Encode(base64Text);
    return finalBase64Text;
  }

  const getStudentInfo = () => {
    var currentTime = Math.floor(Date.now() / 1000);
    var finalouput = encryptText("example@gmail.com" + currentTime);

    const studentInfo = `${finalouput}`;

    return studentInfo;
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
      }}
    >
      {qrCodeData && <QRCode value={qrCodeData} size={200} key={qrCodeData} />}
      <GoogleOAuthProvider clientId="<your_client_id>"></GoogleOAuthProvider>
    </div>
  );
};

export default AttendanceSystem;
