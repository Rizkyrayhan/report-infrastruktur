export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data: T | null;
  message: string;
}

export const successResponse = <T>(data: T, message: string = 'Success'): ApiResponse<T> => {
  return {
    status: 'success',
    data,
    message,
  };
};

export const errorResponse = (message: string): ApiResponse<null> => {
  return {
    status: 'error',
    data: null,
    message,
  };
};
