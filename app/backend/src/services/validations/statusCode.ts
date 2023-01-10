const statusCode = {
  created: 201,
  successful: 200,
  badRequest: 400,
  acessDenied: 401,
  unprocessable: 422,
};

const mapStatusCode = (errorMessage: string): number => {
  if (errorMessage.includes('required')) return statusCode.badRequest;

  if (errorMessage.includes('must')) return statusCode.badRequest;

  return statusCode.acessDenied;
};

export { statusCode, mapStatusCode };
