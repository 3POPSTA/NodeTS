import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// You can also specify a virtual path prefix
// app.use("/static",express.static("public"));

// Using absolute path (recommended)
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/static', (request: Request, response: Response): void => {
  response.send(`
        <h1>Static Files Example</h1>
        <img src="/images/logo.png" alt="Logo">
        <link rel="stylesheet" href="/css/style.css">
        <script src="/js/script.js"></script>
        `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};
