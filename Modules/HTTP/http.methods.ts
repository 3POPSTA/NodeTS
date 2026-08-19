import http, { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';

export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

let todos: Todo[] = [
  {
    id: 1,
    task: 'Learn Node',
    completed: false
  },
  {
    id: 2,
    task: 'Build an API',
    completed: false
  }
];

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request;
  const host = request.headers.host || 'localhost';
  const parsedUrl = new URL(url || '/', `http://${host}`);
  const pathname = parsedUrl.pathname;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (method === 'GET' && pathname === '/todos') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(todos));
  } else if (method === 'POST' && pathname === '/todos') {
    let body = '';

    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        const newTodo = JSON.parse(body) as Partial<Todo>;
        const id = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
        const createdTodo: Todo = {
          id,
          task: newTodo.task || 'Untitled task',
          completed: Boolean(newTodo.completed)
        };
        todos.push(createdTodo);

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(createdTodo));
      } catch (_error) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (method === 'PUT' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2], 10);
    let body = '';

    request.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      try {
        const updatedTodo = JSON.parse(body) as Partial<Todo>;
        const index = todos.findIndex((t) => t.id === id);

        if (index === -1) {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Todo not found' }));
        } else {
          todos[index] = { ...todos[index], ...updatedTodo, id };
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(todos[index]));
        }
      } catch (_error) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2], 10);
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Todo not found' }));
    } else {
      todos = todos.filter((t) => t.id !== id);
      response.writeHead(204);
      response.end();
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default server;
