import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AttendanceSuccessPage() {
  const isSmallScreen = window.innerWidth <= 600;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("email") == null ||
      localStorage.getItem("isLoggedIn") == null
    ) {
      navigate("/");
    }
  });

  return (
    <div
      style={{
        backgroundColor: "#1D1D20",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
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

      <text>
        <br />
        <br />
      </text>

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
  );
}

export default AttendanceSuccessPage;
