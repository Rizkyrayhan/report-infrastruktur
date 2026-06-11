import { Request, Response, NextFunction } from 'express';

// Middleware for 404 Route Not Found
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    data: null,
    message: `Route Not Found: ${req.method} ${req.originalUrl}`
  });
};
