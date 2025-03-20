// server/websocket.js
import { WebSocketServer } from 'ws';

// Create a new WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Log when the server starts listening
console.log('WebSocket server is running on port 8080');

// Listen for new client connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    // For a simple echo, you can send the message back:
    // ws.send(`You said: ${message}`);
  });

  // Log when the client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
