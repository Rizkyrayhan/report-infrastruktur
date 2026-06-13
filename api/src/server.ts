import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

// Import Routes
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import reportRoutes from './routes/report.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware security
app.use(helmet());
app.use(cors());

// Middleware untuk parsing JSON request body (diperbesar limitnya untuk upload base64)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sajikan folder uploads sebagai file statis
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Endpoint sederhana untuk memastikan server berjalan
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: null,
    message: 'Pong! Backend API Report Infrastruktur berjalan dengan baik.'
  });
});

// Daftarkan API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);

// Middleware untuk menangani Route Not Found (404)
app.use(notFoundHandler);

// Middleware Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
