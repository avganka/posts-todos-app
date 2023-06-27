export function errorHandler(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
}
