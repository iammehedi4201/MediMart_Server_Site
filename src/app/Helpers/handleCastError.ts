import mongoose from 'mongoose';
import { IErrorResponse } from '../Interface/interface';

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {
  const errorDetails = `${err.value} is not a valid ${err.kind}`;

  return {
    statusCode: 400,
    status: 'error',
    message: 'Invalid ID',
    errorDetails: errorDetails,
    errorSource: [
      {
        path: err.path,
        message: errorDetails,
      },
    ],
  };
};

export default handleCastError;
