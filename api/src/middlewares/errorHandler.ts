import { Request, Response, NextFunction } from 'express';

// Global error handler middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode} - ${message}`);
  
  // Hanya tampilkan stack trace pada development
  const isDev = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    status: 'error',
    data: null,
    message: message,
    ...(isDev && { stack: err.stack })
  });
};
