import React, { useState, useEffect } from 'react';
import logo from './inclogo.png'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Guide.css'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import loginimg from './login.png'
import alertimg from './alert.png'
import successimg from './success.png'
import endimg from './endscreen.png'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const Guide = () => {
  const [selectedMode, setSelectedMode] = useState('student');

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };
  useEffect(() => {
    document.title = `Quick Start - AttendINC`;
  }, [selectedMode]);
  const navigate = useNavigate();

  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setScreenSize('phone');
      } else {
        setScreenSize('mac');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const steps = [
    'Install the AttendINC app on your Mac via Testflight',
    'Launch AttendINC and enter your spreadsheet URL',
  ];

  return (
    <div
      style={{
        backgroundColor: "#1D1D20",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
        fontFamily: "'Titillium Web', sans-serif",
        overflow: "auto"
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 40, borderRadius: 10 }} />
        </a>

        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="https://github.com/kidscoots101/inc-terminal-attendance"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white", fontSize: "16px" }}
          >
            <FontAwesomeIcon icon={faStar} style={{ marginRight: "5px" }} />
            <i className="fab fa-github" style={{}}></i> Star Us on Github!
          </a>
        </div> */}
      </header>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap"
      />

      <h1 style={{ color: "#61dafb" }}>
        Getting Started with <u>AttendINC</u>
      </h1>
      <p>
        Welcome to the documentation for AttendINC! In this guide, we will walk
        you through the basics of getting started and using our product
        effectively.
      </p>
      <h2 style={{ color: "#61dafb" }}>I'm a</h2>
      <div className="toggle-bar">
        <button
          style={{
            backgroundColor: selectedMode === "student" ? "#61dafb" : "#333",
            color: selectedMode === "student" ? "#333" : "white",
            transition: "background-color 0.3s, color 0.3s",
            margin: "5px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => handleModeChange("student")}
        >
          Student
        </button>
        <button
          style={{
            backgroundColor: selectedMode === "teacher" ? "#61dafb" : "#333",
            color: selectedMode === "teacher" ? "#333" : "white",
            transition: "background-color 0.3s, color 0.3s",
            margin: "5px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => handleModeChange("teacher")}
        >
          Teacher
        </button>
      </div>
      {selectedMode === "teacher" && (
        <div>
          <h3 style={{ color: "#61dafb" }}>Teacher Mode Content</h3>
          <p>
            Welcome to the Teacher Mode! Here, educators can access a range of
            powerful tools and resources to enhance their teaching experience.
          </p>
          <h3>Requirements</h3>
          <ul>
            <li>
              Install the{" "}
              <a
                href="https://apps.apple.com/us/app/testflight/id899247664"
                target="_blank"
                style={{ color: "#61dafb" }}
              >
                Testflight
              </a>{" "}
              macOS app on your device.
            </li>
            <li>
              Requires a Mac running macOS Monterey/macOS 12 or later.
            </li>
          </ul>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step
                  key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "#61afdb",
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white",
                        fontWeight: "bold",
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#61afdbn",
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white",
                        fontWeight: "bold",
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "black",
                    },
                  }}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      )}

      {selectedMode === "student" && (
        <div>
          {/* <h3 style={{ color: '#61dafb' }}>Getting</h3> */}
          <div
            style={{
              justifyContent: "center",
              height: screenSize === "mac" ? "275vh" : "300vh",
            }}
          >
            {/* 
          <div style={circleStyle}>
            <div style={circleStyle1}>
                <text style={{fontWeight: 'bold', fontSize: 25}}>Develop</text>
                
                </div>
        </div>   
          */}

            <Timeline position={screenSize === "mac" ? "alternate" : "none"}>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {/*  */}
                  <h3>
                    Login to AttendINC with your{" "}
                    <a
                      href="https://www.sst.edu.sg/"
                      target="_blank"
                      style={{ color: "#61dafb" }}
                    >
                      SST
                    </a>{" "}
                    school email
                  </h3>
                  <p style={{ color: "#9ba1a6" }}>
                    This is important to ensure that we know you are the one
                    inside our of the attendance spreadsheet.
                  </p>
                  <img
                    src={loginimg}
                    width="239"
                    height="250"
                    style={{ borderRadius: 10, marginTop: 20 }}
                  />
                </TimelineContent>
              </TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {/*  */}
                  <h3>Camera Permissions</h3>
                  <p style={{ color: "#9ba1a6" }}>
                    Click 'Allow Camera Access' to grant AttendINC access to your device's camera.
                  </p>
                  <img
                    src={alertimg}
                    width={screenSize === "mac" ? "300" : "250"}
                    height={screenSize === "mac" ? "250" : "200"}
                    style={{ borderRadius: 10, marginTop: 20 }}
                  />
                </TimelineContent>
              </TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {/*  */}
                  <h3>
                    Point your camera towards the QR Code displayed on screen by your teacher and a
                    pop up should appear.
                  </h3>
                  <p style={{ color: "#9ba1a6" }}>
                    Make sure it is <u>fully</u> shown in the camera. A confirmation alert will appear, press
                    'OK' to submit your attendance.
                  </p>
                  <img
                    src={successimg}
                    width="239"
                    height="500"
                    style={{ borderRadius: 10, marginTop: 20 }}
                  />
                </TimelineContent>
              </TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="success" variant="outlined" />
                </TimelineSeparator>
                <TimelineContent>
                  {/*  */}
                  <h3>Success!</h3>
                  <p style={{ color: "#9ba1a6" }}>
                    Upon pressing 'OK', you will be directed to the screen
                    below, and the status of your attendance will be displayed.<br /><br />
                    
                    If it shows 'Success', your attendance has been successfully 
                    taken. If there is an error, please refresh the page and scan
                    the QR Code again. If your attendance has already been marked, 
                    it will show up as 'Already Taken'.<br /><br />
                    
                    Should the status of your attendance not appear on the webpage,
                    you can double-check it on your teacher's screen, on the right
                    of the displayed QR Code.
                  </p>
                  <img
                    src={endimg}
                    width="239"
                    height="500"
                    style={{ borderRadius: 10, marginTop: 20 }}
                  />
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
