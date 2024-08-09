/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { IErrorResponse } from '../Interface/interface';
import config from '../config';
import { errorPreprossing } from '../Helpers/errorPreProssing';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let errorResponse: IErrorResponse = {
    statusCode: err.statusCode || 500,
    status: 'error',
    message: err.message || 'something went wrong',
    errorDetails: err.message || 'something went wrong',
    errorSource: [
      {
        path: [],
        message: 'something went wrong',
      },
    ],
  };

  //error preprossing
  errorResponse = errorPreprossing(err) as IErrorResponse;

  //Ultimately we will send this errorReponse to the client
  return res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    errorDetails: errorResponse.errorDetails,
    errorSource: errorResponse.errorSource,
    err,
    stack:
      config.node_env === 'production' || errorResponse.stack === null
        ? null
        : err?.stack,
  });
};
