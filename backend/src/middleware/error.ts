import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: Object.values((err as any).errors).map((e: any) => e.message),
    });
  }

  // Handle mongoose duplicate key errors
  if ((err as any).code === 11000) {
    return res.status(400).json({
      status: 'fail',
      message: 'Duplicate field value entered',
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Token expired',
    });
  }

  // Default error
  console.error('Error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
}; 