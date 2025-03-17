import React from 'react';
import './Leaderboard.css';

const studentLeaderboardData = [
  { nickname: "Alice", trophies: 20 },
  { nickname: "Bob", trophies: 18 },
  { nickname: "Charlie", trophies: 15 },
  { nickname: "Diana", trophies: 12 },
  { nickname: "Edward", trophies: 10 }
];

const projectLeaderboardData = [
  { projectName: "Solar Car", upvotes: 50 },
  { projectName: "Robot Arm", upvotes: 45 },
  { projectName: "Smart Home", upvotes: 40 },
  { projectName: "Eco Garden", upvotes: 35 },
  { projectName: "VR Game", upvotes: 30 }
];

function Leaderboard() {
  return (
    <div className="leaderboard-page">
      <h1>Leaderboards</h1>
      <div className="leaderboard-section">
        <h2>Top Students</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nickname</th>
              <th>Trophies</th>
            </tr>
          </thead>
          <tbody>
            {studentLeaderboardData.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.nickname}</td>
                <td>{student.trophies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="leaderboard-section">
        <h2>Top Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Project</th>
              <th>Upvotes</th>
            </tr>
          </thead>
          <tbody>
            {projectLeaderboardData.map((project, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{project.projectName}</td>
                <td>{project.upvotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
