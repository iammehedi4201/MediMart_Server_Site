import mongoose from 'mongoose';
import { IErrorResponse, TErrorSource } from '../Interface/interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      let message = '';

      if (val?.name === 'ValidatorError') {
        message += val?.message;
      }
      if (val?.name === 'CastError') {
        message += `${val?.path} is ${val?.kind} type  but recived ${val?.kind} type value `;
      }
      return {
        path: val?.path, // maxcapity
        message: message, // maxcapity is required
      };
    },
  );

  //error Details
  const errorDetails = errorSource.map((ele) => ele.message).join(' .');

  return {
    statusCode: 400,
    status: 'error',
    message: 'validation Error',
    errorDetails,
    errorSource,
  };
};

export default handleValidationError;
