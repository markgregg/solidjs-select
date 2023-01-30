export const errorMessage = (error: any): string =>
  `${error instanceof Error ? error.message : error}`;
