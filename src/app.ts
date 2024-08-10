import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/Middleware/globalErrorHandler';
import route from './app/Routes/Routes';
import notFound from './app/Middleware/NotFound';
const app: Application = express();

//parser
app.use(express.json());
app.use(express.text());

//using cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

//application routes
app.use('/api', route);

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome To  MediMart');
});

//Global Error Handler
app.use(globalErrorHandler);

//not found middlewar
app.use(notFound);
export default app;
