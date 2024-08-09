/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorResponse } from '../Interface/interface';

const handleDuplicateError = (err: any): IErrorResponse => {
  const duplicateField = Object.keys(err.keyValue)[0];

  err.message = err.message.match(/\w+: "[^"]+"/g); //  email: /iammehedi296@gmail.com/
  err.message[0] = err.message[0].replace(/"/g, '');

  if (err.message[0] === null) {
    err.message = err.message.match(/\w+: \d+/g); // phone: 01777777777
  }

  return {
    statusCode: 500,
    status: 'error',
    message: 'Duplicate Error',
    errorDetails: `${err.message} is already taken`,
    errorSource: [
      {
        path: [duplicateField],
        message: `${err.message} is already taken`,
      },
    ],
  };
};

export default handleDuplicateError;
