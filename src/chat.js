// src/chat.js
import React, { useEffect, useState } from 'react';
import './chat.css';

function Chat() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  // Set the default language based on the user's browser settings.
  const defaultLang = navigator.language ? navigator.language.split('-')[0] : 'en';
  const [targetLang, setTargetLang] = useState(defaultLang);
  const [translatedMessages, setTranslatedMessages] = useState({});

  useEffect(() => {
    let socket;
    let reconnectInterval = null; // initialize to null
  
    // Function to connect WebSocket and handle events
    const connect = () => {
      console.log("Attempting to connect WebSocket...");
      socket = new WebSocket('ws://localhost:8080');
      setWs(socket);
  
      socket.onopen = () => {
        console.log("WebSocket connection opened");
        // Clear any existing reconnect interval and reset it to null
        if (reconnectInterval) {
          clearInterval(reconnectInterval);
          reconnectInterval = null;
        }
      };
  
      socket.onmessage = (event) => {
        console.log("Message received:", event.data);
        setChatLog(prev => [...prev, event.data]);
      };
  
      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
        // Only set a new reconnect interval if one is not already set
        if (!reconnectInterval) {
          reconnectInterval = setInterval(() => {
            console.log("Reconnecting WebSocket...");
            connect();
          }, 5000);
        }
      };
  
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
      };
    };
  
    connect();
  
    // Cleanup on unmount
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
      }
    };
  }, []);  

  const sendMessage = () => {
    console.log("sendMessage called. Message:", message);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setChatLog(prev => [...prev, message]);
      setMessage('');
    } else {
      console.error("WebSocket is not open. Current state:", ws ? ws.readyState : "No connection");
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
      <h2>Chat (Translating to: {targetLang.toUpperCase()})</h2>
      <div className="chat-log">
        {chatLog.map((msg, index) => (
          <div key={index} className="chat-message">
            <span>{msg}</span>
            <button onClick={() => handleTranslate(msg, index)}>Translate</button>
            {translatedMessages[index] && (
              <p className="translated">{translatedMessages[index]}</p>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={(e) => { 
          e.preventDefault();
          console.log("Form submitted, sending message");
          sendMessage();
        }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => console.log("Key pressed:", e.key)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
