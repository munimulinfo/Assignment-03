export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type TzoodError = {
  path: string | number;
  message: string;
};

export type TGenerirEroror = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: TErrorSources;
};
