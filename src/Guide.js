import React, { useState, useEffect } from 'react';

const Guide = () => {
  const [selectedMode, setSelectedMode] = useState('student');

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };
  useEffect(() => {
    document.title = `Quick Start - Attend INC`;
  }, [selectedMode]);

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Titillium+Web:400,700&display=swap" />

      <h1 style={{ color: '#61dafb',  }}>Getting Started with AttendINC</h1>
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
      <li>Install the <a href="https://apps.apple.com/us/app/testflight/id899247664" style={{color: '#61dafb'}}>Testflight</a> macOS app on your device. </li>
      <li>Requires macOS Ventura (or later) or Mac running macOS 12 onwards</li>
    </ul>
        </div>
      )}
      {selectedMode === 'student' && (
        <div>
          <h3 style={{ color: '#61dafb' }}>Student Mode Content</h3>
          <p>
            Welcome to the Student Mode! Students can find study materials,
            assignments, and resources to support their learning journey.
          </p>
        </div>
      )}
    </div>
  );
};

export default Guide;
