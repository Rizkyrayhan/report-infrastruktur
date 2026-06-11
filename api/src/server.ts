import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware security
app.use(helmet());
app.use(cors());

// Middleware untuk parsing JSON request body
app.use(express.json());

// Endpoint sederhana untuk memastikan server berjalan
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: null,
    message: 'Pong! Backend API Report Infrastruktur berjalan dengan baik.'
  });
});

// Middleware untuk menangani Route Not Found (404)
app.use(notFoundHandler);

// Middleware Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
