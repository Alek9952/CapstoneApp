import React, { useState } from 'react';

function Login({ onLogin }) {
  const [classCode, setClassCode] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classCode.trim() === '' || nickname.trim() === '') {
      alert('Please enter both a class code and a nickname.');
      return;
    }
    // For now, simply call onLogin with the user details.
    onLogin({ classCode, nickname });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="classCode">Class Code</label>
            <input
              type="text"
              id="classCode"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter your class code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
