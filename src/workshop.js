import React, { useState } from 'react';
import './Workshop.css';

const backgroundImages = [
  '/workshop1.jpg', // initial workshop/studio look
  '/workshop2.jpg', // evolves after trophy count reaches threshold 1
  '/workshop3.jpg', // evolves further...
  '/workshop4.jpg',
  '/workshop5.jpg'  // final evolved workshop/studio look
];

function Workshop() {
  // Use state to keep track of the trophy count
  const [trophyCount, setTrophyCount] = useState(0);

  // Determine which background to use based on trophy count.
  // In this example, every 5 trophies upgrade the studio.
  const threshold = 5;
  let backgroundIndex = Math.floor(trophyCount / threshold);

  // Make sure we don't go past the last background image
  if (backgroundIndex >= backgroundImages.length) {
    backgroundIndex = backgroundImages.length - 1;
  }

  const currentBackground = backgroundImages[backgroundIndex];

  // Function to simulate collecting a trophy
  const handleCollectTrophy = () => {
    setTrophyCount(prevCount => prevCount + 1);
  };

  return (
    <div
      className="workshop"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      <div className="trophy-info">
        <h1>Workshop Studio</h1>
        <p>Trophies Collected: {trophyCount}</p>
        <button onClick={handleCollectTrophy}>Collect Trophy</button>
      </div>
    </div>
  );
}

export default Workshop;
