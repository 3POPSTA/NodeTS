import express, { Application } from 'express';
import userRoutes from './routes/users';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
module.exports = app;
