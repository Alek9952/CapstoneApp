// src/Chat.js
import React, { useEffect, useState } from 'react';
import './Chat.css';

function Chat() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [targetLang, setTargetLang] = useState('es'); // e.g., Spanish
  const [translatedMessages, setTranslatedMessages] = useState({});

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onmessage = (event) => {
      setChatLog(prev => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && message.trim() !== '') {
      ws.send(message);
      setChatLog(prev => [...prev, message]);
      setMessage('');
    }
  };

  const handleTranslate = async (msg, index) => {
    try {
      const response = await fetch('http://localhost:3001/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg, targetLang })
      });
      const data = await response.json();
      setTranslatedMessages(prev => ({ ...prev, [index]: data.translatedText }));
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-log">
        {chatLog.map((msg, index) => (
          <div key={index} className="chat-message">
            <span>{msg}</span>
            <button onClick={() => handleTranslate(msg, index)}>Translate</button>
            {translatedMessages[index] && <p className="translated">{translatedMessages[index]}</p>}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
