import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import productsRouter from './routes/products';

const app = express();
const port = 3000;

// use routers
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/', (request: Request, response: Response): void => {
  response.send('Main application home page');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};
