import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    Success: false,
    messae: `Route not found ${req.originalUrl}`,
  });
};

export default notFound;
