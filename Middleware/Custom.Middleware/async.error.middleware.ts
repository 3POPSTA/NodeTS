import express, { Request, Response, NextFunction, RequestHandler } from 'express';

const app = express();
const port = 3000;

async function fetchDataFromDatabase(): Promise<{ id: number; data: string }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, data: 'Sample fetched data' }), 50);
  });
}

app.get('/async-data', async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const data = await fetchDataFromDatabase();
    response.json(data);
  } catch (error: unknown) {
    next(error);
  }
});

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (request: Request, response: Response, next: NextFunction): void => {
    Promise.resolve(fn(request, response, next)).catch(next);
  };
}

app.get(
  '/better-async',
  asyncHandler(async (_request: Request, response: Response) => {
    const data = await fetchDataFromDatabase();
    response.json(data);
  })
);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export { app, asyncHandler, fetchDataFromDatabase };
