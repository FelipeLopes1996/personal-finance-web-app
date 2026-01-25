export interface IApiError {
  message: string;
  error: string;
  errors?: Record<string, string[]>;
}
