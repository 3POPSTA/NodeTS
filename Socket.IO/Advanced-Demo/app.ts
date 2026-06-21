import express, { Application } from 'express';
import http from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import type { AddressInfo } from 'net';

const MAX_USERNAME_LENGTH = 32;
const MAX_MESSAGE_LENGTH = 1000;

interface SocketData {
  username: string;
}

export interface ChatServerInstance {
  app: Application;
  server: http.Server;
  io: Server;
}

export function createChatServer(): ChatServerInstance {
  const app: Application = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(express.static(path.join(__dirname, 'public')));

  io.on('connection', (socket: Socket<any, any, any, SocketData>) => {
    socket.data.username = 'Anonymous';
    console.log('A user connected');

    socket.on('chat message', (message: unknown) => {
      if (typeof message !== 'string') {
        socket.emit('chat error', { message: 'Messages must be text.' });
        return;
      }

      const trimmedMessage = message.trim();
      if (!trimmedMessage || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
        socket.emit('chat error', {
          message: `Messages must be between 1 and ${MAX_MESSAGE_LENGTH} characters.`
        });
        return;
      }

      io.emit('chat message', {
        username: socket.data.username,
        message: trimmedMessage,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('set username', (username: unknown) => {
      if (typeof username !== 'string') {
        socket.emit('chat error', { message: 'Usernames must be text.' });
        return;
      }

      const trimmedUsername = username.trim();
      if (!trimmedUsername || trimmedUsername.length > MAX_USERNAME_LENGTH) {
        socket.emit('chat error', {
          message: `Usernames must be between 1 and ${MAX_USERNAME_LENGTH} characters.`
        });
        return;
      }

      const oldUsername = socket.data.username;
      if (oldUsername === trimmedUsername) {
        return;
      }

      socket.data.username = trimmedUsername;
      io.emit('user joined', {
        oldUsername,
        newUsername: trimmedUsername
      });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      io.emit('user left', { username: socket.data.username });
    });
  });

  return { app, server, io };
}

if (typeof require !== 'undefined' && require.main === module) {
  const { server } = createChatServer();
  const port = process.env.PORT === undefined ? 3000 : Number(process.env.PORT);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new RangeError('PORT must be an integer between 0 and 65535.');
  }

  server.listen(port, () => {
    const addr = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${addr.port}`);
  });
}
