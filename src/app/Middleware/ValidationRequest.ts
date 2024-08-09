import { AnyZodObject } from 'zod';
import CatchAsync from '../Utils/CatchAsync';

const ValidateRequest = (Schema: AnyZodObject) => {
  return CatchAsync(async (req, res, next) => {
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default ValidateRequest;
