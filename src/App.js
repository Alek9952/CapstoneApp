import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './login'; // Make sure your login component file is named "login.js"
import Leaderboard from './Leaderboard'; // Your leaderboard component
import Chat from './chat'; // Your chat component
import './App.css';

function App() {
  // State for login (null means not logged in)
  const [user, setUser] = useState(null);
  // States to track trophy and coin counts
  const [trophyCount, setTrophyCount] = useState(0);
  const [coinCount, setCoinCount] = useState(0);

  const navigate = useNavigate();

  // Array of background images for the evolving workshop/studio
  const backgroundImages = [
    '/workshop1.png',
    '/workshop2.png',
    '/workshop3.png',
    '/workshop4.png',
    '/workshop5.png'
  ];

  // Determine the current background based on trophy count.
  // Every 5 trophies upgrade the studio.
  const trophiesPerStage = 5;
  let stageIndex = Math.floor(trophyCount / trophiesPerStage);
  if (stageIndex >= backgroundImages.length) {
    stageIndex = backgroundImages.length - 1;
  }
  const currentBackground = backgroundImages[stageIndex];

  // Handlers to adjust trophy count manually (for demo purposes)
  const handleIncreaseTrophy = () => {
    setTrophyCount(prev => prev + 1);
  };

  const handleDecreaseTrophy = () => {
    setTrophyCount(prev => Math.max(prev - 1, 0));
  };

  // Handler for the game interface buttons
  const handleClick = (buttonType) => {
    console.log(`${buttonType} button clicked`);
    if (buttonType === 'leaderboard') {
      navigate('/leaderboard');
    } else if (buttonType === 'chat') {
      navigate('/chat');
    } else {
      alert(`You clicked the ${buttonType} button!`);
    }
  };

  // Callback for login from the login component
  const handleLogin = (loginData) => {
    console.log('User logged in:', loginData);
    setUser(loginData);
  };

  // If the user is not logged in, render the login component
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className="app-container"
            style={{ backgroundImage: `url(${currentBackground})` }}
          >
            {/* Status Panel (Top Right) */}
            <div className="status-panel">
              <p>{user.nickname}</p>
              <p>
                <img src="/trophy.png" alt="Trophy" className="icon-small" /> {trophyCount}
              </p>
              <p>
                <img src="/coin.png" alt="Coin" className="icon-small" /> {coinCount}
              </p>
            </div>

            {/* Workshop Info Panel (Center) */}
            <div className="workshop-info">
              <h1>Workshop Studio</h1>
            </div>

            {/* Left Button Group (Bottom Left) */}
            <div className="left-button-group">
              {/* Naya button */}
              <a
                href="https://naya.studio/login"
                target="_blank"
                rel="noopener noreferrer"
                className="game-button naya"
              >
                <span className="icon"></span>
                Naya
              </a>
              {/* TinkerCad button */}
              <a
                href="https://tinkercad.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="game-button tinker-cad"
              >
                <span className="icon"></span>
                TinkerCad
              </a>
              {/* Leaderboard button */}
              <button
                className="game-button leaderboard"
                onClick={() => handleClick('leaderboard')}
              >
                <span className="icon"></span>
                Leaderboard
              </button>
              {/* Learning Hub button */}
              <button
                className="game-button learning-hub"
                onClick={() => handleClick('learning-hub')}
              >
                <span className="icon"></span>
                Learning Hub
              </button>
            </div>

            {/* Right Button Group (Bottom Right) */}
            <div className="right-button-group">
              <button
                className="game-button connect"
                onClick={() => handleClick('connect')}
              >
                <span className="icon"></span>
                Connect
              </button>
              <button
                className="game-button challenges"
                onClick={() => handleClick('challenges')}
              >
                <span className="icon"></span>
                Challenges
              </button>
              {/* Chat button */}
              <button
                className="game-button chat"
                onClick={() => handleClick('chat')}
              >
                <span className="icon"></span>
                Chat
              </button>
            </div>

            {/* Trophy Controls Panel (Bottom, for demo purposes) */}
            <div className="trophy-controls">
              <button onClick={handleIncreaseTrophy}>Increase Trophy</button>
              <button onClick={handleDecreaseTrophy}>Decrease Trophy</button>
            </div>
          </div>
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
