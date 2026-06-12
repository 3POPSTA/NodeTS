import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simple route
app.get('/', (request: Request, response: Response): void => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handler
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle new messages
  socket.on('chat message', (message: string) => {
    console.log('Message Received: ', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket Running at http://localhost:${PORT}`);
});

export {};
