/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorSource = {
  path: string[] | string;
  message: string;
}[];

export interface IErrorResponse {
  statusCode: number;
  status: 'error';
  message: string;
  errorDetails: string;
  errorSource: TErrorSource | null;
  stack?: any;
}
