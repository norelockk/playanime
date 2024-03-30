export const getExceptionStack = (err: Error): string | undefined => err.stack;
export const getExceptionMessage = (err: Error): string => err.message;