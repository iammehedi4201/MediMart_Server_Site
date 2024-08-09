/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import AppError from './AppError';
import JWTError from './JwtError';
import handleCastError from './handleCastError';
import handleDuplicateError from './handleDuplicateError';
import handleValidationError from './handleValidationError';
import handleZodError from './handleZodError';

export const errorPreprossing = (err: any) => {
  //check if the error form zod
  if (err instanceof ZodError) {
    return handleZodError(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err);
  } else if (err.code === 11000) {
    return handleDuplicateError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err);
  } else if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      status: 'error',
      message: 'something went wrong',
      errorDetails: err.message,
      errorSource: null,
    };
  } else if (err instanceof JWTError) {
    return {
      statusCode: err.statusCode,
      status: 'error',
      message: 'Unauthorized Access',
      errorDetails: err.message,
      errorSource: null,
      stack: null,
    };
  } else if (err instanceof Error) {
    return {
      statusCode: 500,
      status: 'error',
      message: 'something went wrong',
      errorDetails: err.message,
      errorSource: null,
    };
  }
};
