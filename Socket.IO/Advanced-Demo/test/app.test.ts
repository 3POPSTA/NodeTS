import assert from 'node:assert/strict';
import { spawn, ChildProcess } from 'node:child_process';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { io as createClient, Socket as ClientSocket } from 'socket.io-client';
import { createChatServer } from '../app';
import type { Server as HttpServer } from 'node:http';
import type { Server as SocketIOServer } from 'socket.io';
import type { AddressInfo } from 'node:net';

let io: SocketIOServer;
let server: HttpServer;
let baseUrl: string;
const clients: ClientSocket[] = [];

function waitForEvent<T = any>(socket: ClientSocket, eventName: string): Promise<T> {
  return new Promise((resolve, reject) => {
    function onEvent(data: T): void {
      clearTimeout(timeout);
      resolve(data);
    }

    const timeout = setTimeout(() => {
      socket.off(eventName, onEvent);
      reject(new Error(`Timed out waiting for "${eventName}"`));
    }, 2000);

    socket.once(eventName, onEvent);
  });
}

async function connectClient(): Promise<ClientSocket> {
  const client: ClientSocket = createClient(baseUrl, {
    reconnection: false,
    timeout: 2000,
    transports: ['websocket']
  });
  clients.push(client);

  await new Promise<void>((resolve, reject) => {
    client.once('connect', () => resolve());
    client.once('connect_error', (err) => reject(err));
  });

  return client;
}

function waitForServer(child: ChildProcess): Promise<string> {
  return new Promise((resolve, reject) => {
    let output = '';

    function cleanup(): void {
      clearTimeout(timer);
      child.stdout?.off('data', onOutput);
      child.off('exit', onExit);
      child.off('error', onError);
    }

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for the server to start.'));
    }, 3000);

    function onOutput(chunk: Buffer | string): void {
      output += chunk.toString();
      const match = output.match(/Server running at (http:\/\/localhost:\d+)/);
      if (match) {
        cleanup();
        resolve(match[1]);
      }
    }

    function onExit(code: number | null): void {
      cleanup();
      reject(new Error(`Server exited before startup with code ${code}: ${output}`));
    }

    function onError(error: Error): void {
      cleanup();
      reject(error);
    }

    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', onOutput);
    }
    child.once('exit', onExit);
    child.once('error', onError);
  });
}

before(async () => {
  ({ io, server } = createChatServer());
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, () => resolve());
  });
  const addr = server.address() as AddressInfo;
  baseUrl = `http://localhost:${addr.port}`;
});

after(async () => {
  for (const client of clients) {
    client.disconnect();
  }
  await new Promise((resolve) => io.close(resolve));
});

test('serves the chat and validates and broadcasts chat events', async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Simple Chat/);

  const [alice, bob] = await Promise.all([connectClient(), connectClient()]);

  const joinedEvent = waitForEvent<{ oldUsername: string; newUsername: string }>(bob, 'user joined');
  alice.emit('set username', ' Alice ');
  assert.deepEqual(await joinedEvent, {
    oldUsername: 'Anonymous',
    newUsername: 'Alice'
  });

  const invalidUsername = waitForEvent<{ message: string }>(alice, 'chat error');
  alice.emit('set username', 'a'.repeat(33));
  assert.match((await invalidUsername).message, /between 1 and 32/);

  interface ChatMsg {
    username: string;
    message: string;
    timestamp: string;
  }
  const aliceMessage = waitForEvent<ChatMsg>(alice, 'chat message');
  const bobMessage = waitForEvent<ChatMsg>(bob, 'chat message');
  alice.emit('chat message', '  Hello, everyone!  ');

  const [messageForAlice, messageForBob] = await Promise.all([aliceMessage, bobMessage]);
  assert.deepEqual(messageForAlice, messageForBob);
  assert.equal(messageForAlice.username, 'Alice');
  assert.equal(messageForAlice.message, 'Hello, everyone!');
  assert.ok(Number.isFinite(Date.parse(messageForAlice.timestamp)));

  const invalidMessage = waitForEvent<{ message: string }>(alice, 'chat error');
  alice.emit('chat message', { message: 'not a string' });
  assert.match((await invalidMessage).message, /must be text/);

  const leftEvent = waitForEvent<{ username: string }>(bob, 'user left');
  alice.disconnect();
  assert.deepEqual(await leftEvent, { username: 'Alice' });
});

test('starts on the numeric TCP port supplied by PORT', async () => {
  const child = spawn(process.execPath, ['app.ts'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    const url = await waitForServer(child);
    const response = await fetch(url);
    assert.equal(response.status, 200);
  } finally {
    if (child.exitCode === null) {
      child.kill();
      await new Promise((resolve) => child.once('exit', resolve));
    }
  }
});

export {};
