import React, { useEffect } from "react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const AttendanceSystem = () => {
  const clientId =
    "635818492905-f30iuhv6kjtvo08fv8juq468mr6nj7u6.apps.googleusercontent.com";
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log("Login Success", response);
    navigate("/Qr");
    console.log(response);
    // setIsLoggedIn(true);
  };
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

      <img
        src="data:image/png;base64,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"
        style={{ maxWidth: "80%", height: "auto" }}
      />
      <h1 style={{ color: "white" }}>Welcome to AttendINC</h1>
      <text
        style={{
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
        onFailure={console.log("Nah not it")}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: 20 }}
      />
      {/* </GoogleOAuthProvider> */}
      <text style={{ color: "white", fontSize: 14, paddingTop: 20 }}>
        Created with ❤️ by 2023 ExCo members
      </text>
    </div>
  );
};

export default AttendanceSystem;
