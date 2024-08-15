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
// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://medi-mart-client.vercel.app',
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
