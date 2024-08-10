import { AnyZodObject } from 'zod';
import CatchAsync from '../Utils/CatchAsync';

const validateRequest = (Schema: AnyZodObject) => {
  return CatchAsync(async (req, res, next) => {
    await Schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
