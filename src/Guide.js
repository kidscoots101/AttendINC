import React, { useState, useEffect } from 'react';
import logo from './inclogo.png'
import { useLocation, useNavigate } from "react-router-dom";
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

const Guide = () => {
  const [selectedMode, setSelectedMode] = useState('student');

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };
  useEffect(() => {
    document.title = `Quick Start - Attend INC`;
  }, [selectedMode]);
  const navigate = useNavigate();
  const circleStyle = {
    width: '220px',    
    height: '220px',   
    borderRadius: '50%', 
    backgroundColor: '#61dafb', 
    backgroundColor: 'rgba(0, 0, 255, 0.6)',
    justifyContent: 'center',
    display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  };
  const circleStyle1 = {
    width: '150px',    
    height: '150px',   
    borderRadius: '50%', 
    backgroundColor: '#61dafb', 
    backgroundColor: 'rgba(0, 0, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // You can adjust this to center vertically within the viewport
  };
  return  (
    <div
      style={{
        backgroundColor: '#1D1D20',
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
        fontFamily: "'Titillium Web', sans-serif",
      }}
    >
        <header style={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" onClick={(e) => {
            e.preventDefault();
            navigate("/"); 
            }}>
        <img src={logo} alt="Logo" style={{ height: 40, borderRadius: 10 }} />
        </a>

    <div style={{ display: 'flex', alignItems: 'center' }}>
        <a
            href="https://github.com/kidscoots101/inc-terminal-attendance"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}
        >
            <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} />
            <i className="fab fa-github" style={{ }}></i> Star Us on Github!
        </a>
    </div>
</header>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap" />

      <h1 style={{ color: '#61dafb',  }}>Getting Started with <u>AttendINC</u></h1>
      <p>
        Welcome to the documentation for AttendINC! In this guide, we
        will walk you through the basics of getting started and using our
        product effectively.
      </p>
      <h2 style={{ color: '#61dafb' }}>I'm a</h2>
      <div className="toggle-bar">
        <button
          style={{
            backgroundColor: selectedMode === 'student' ? '#61dafb' : '#333',
            color: selectedMode === 'student' ? '#333' : 'white',
            transition: 'background-color 0.3s, color 0.3s',
            margin: '5px',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleModeChange('student')}
        >
          Student
        </button>
        <button
          style={{
            backgroundColor: selectedMode === 'teacher' ? '#61dafb' : '#333',
            color: selectedMode === 'teacher' ? '#333' : 'white',
            transition: 'background-color 0.3s, color 0.3s', 
            margin: '5px',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleModeChange('teacher')}
        >
          Teacher
        </button>
      </div>
      {selectedMode === 'teacher' && (
  <div>
    <h3 style={{ color: '#61dafb' }}>Teacher Mode Content</h3>
    <p>
      Welcome to the Teacher Mode! Here, educators can access a range of
      powerful tools and resources to enhance their teaching experience.
    </p>
    <h3>Requirements</h3>
    <ul>
      <li>
        Install the{' '}
        <a
          href="https://apps.apple.com/us/app/testflight/id899247664"
          target="_blank"
          style={{ color: '#61dafb' }}
        >
          Testflight
        </a>{' '}
        macOS app on your device.
      </li>
      <li>Requires macOS Ventura (or later) or Mac running macOS 12 onwards</li>
    </ul>
    
  </div>
)}

      {selectedMode === 'student' && (
        <div>
          <h3 style={{ color: '#61dafb' }}>Step 1</h3>
          <p>
            Welcome to the Student Mode! Students can find study materials,
            assignments, and resources to support their learning journey.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>    
          {/* 
          <div style={circleStyle}>
            <div style={circleStyle1}>
                <text style={{fontWeight: 'bold', fontSize: 25}}>Develop</text>
                
                </div>
        </div>   
          */}
          
        <Timeline position="alternate">
            
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="secondary" />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
        {/*  */}
       <h3>Login to AttendINC with your <a href="https://www.sst.edu.sg/" target="_blank" style={{color: '#61dafb'}}>SST</a> school email</h3>
       <text style={{color: '#9ba1a6'}}>This is important to ensure that we know you are the one inside our list.</text>
       <img src={loginimg} width="239" height="250" style={{borderRadius: 10}} />
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="success" />
    </TimelineSeparator>
    <TimelineContent>
        {/*  */}
        <h3>Permissions</h3>
        <text style={{color: '#9ba1a6'}}>Click 'Allow Camera Access'. (don't worry we are not stealing any data)</text>
        <img src={alertimg} width="300" height="250" style={{borderRadius: 10}} />
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
