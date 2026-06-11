import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';

// Extensi tipe Request Express untuk menyisipkan data user yang login
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-development';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('Unauthorized: Token is missing or invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(errorResponse('Unauthorized: Token is invalid or expired'));
  }
};
